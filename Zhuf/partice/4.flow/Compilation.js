const path = require('path').posix;
const fs = require('fs');
const types = require('@babel/types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const { SyncHook } = require('tapable');
const baseDir = toUnixPath(process.cwd());
function toUnixPath(filePath) {
    return filePath.replace(/\\/g, '/');
}

class Compilation {
  constructor(options) {
    this.options = options
    this.modules = [] // 存放本次编译的所有模块
    this.fileDependencies = [] // 当前编译依赖的文件
    this.chunks = [] // 里面放置所有的代码块
    this.assets = {}
    this.hooks = {
      chunkAsset: new SyncHook(['chunk', 'filename'])
    }
  }

  build(onCompiled) {
    let entry = {}
    if (typeof this.options.entry === 'string') {
      entry.main = this.options.entry
    } else {
      entry = this.options.entry
    }

    for (let entryName in entry) {
      let entryPath = path.join(baseDir, entry[entryName])
      this.fileDependencies.push(entryPath)
      let entryModule = this.buildModule(entryName, entryPath)
      let chunk = {
        name: entryName,
        entryModule,
        modules: this.modules.filter( module => module.names.includes(entryName) )
      }
      this.chunks.push(chunk)
      this.chunks.forEach(chunk => {
        let filename = this.options.output.filename.replace('[name]', chunk.name);
        this.hooks.chunkAsset.call(chunk, filename)
        this.assets[filename] = getSource(chunk)
      })
    }
    onCompiled(null, {
      modules: this.modules,
      chunks: this.chunks,
      assets: this.assets,
    }, this.fileDependencies)
  }

  buildModule(name, modulePath) {
    let sourceCode = fs.readFileSync(modulePath, 'utf-8')
    let { rules } = this.options.module
    let loaders = []
    rules.forEach(rule => {
      if (modulePath.match(rule.test)) {
        loaders.push(...rule.use)
      }
    })
    sourceCode = loaders.reduceRight((sourceCode, loader) => {
      return require(loader)(sourceCode)
    }, sourceCode)
    let moduleId = "./" + path.relative(baseDir, modulePath)
    let module = {
      id: moduleId,
      dependencies: [],
      names: [name]
    }
    let ast = parser.parse(sourceCode, {
      sourceType: 'module'
    })
    traverse(ast, {
      CallExpression: ({ node }) => {
        if (node.callee.name === 'require') {
          let depModuleName = node.arguments[0].value // ./title
          let dirname = path.dirname(modulePath)
          let depModulePath = path.join(dirname, depModuleName)
          let extensions = this.options.resolve.extensions
          depModulePath = tryExtensions(depModulePath, extensions)
          // 把此依赖文件添加到依赖数组里，当文件变化了，会重新启动编译， 创建一个新的 Compilation
          this.fileDependencies.push(depModulePath)
          let depModuleId = './' + path.relative(baseDir, depModulePath);
          //修改AST语法对，把require方法的参数变成依赖的模块ID
          node.arguments = [types.stringLiteral(depModuleId)];
          // 把依赖信息添加到依赖数组里
          module.dependencies.push({
            depModuleId,
            depModulePath
          })
        }
      }
    })
    let { code } = generator(ast)
    module._source = code
    module.dependencies.forEach(({ depModuleId, depModulePath }) => {
      let buildedModule = this.modules.find(module => module.id === depModuleId)
      if (buildedModule) {
        buildedModule.names.push(name)
      } else {
        let depModule = this.buildModule(name, depModulePath)
        this.modules.push(depModule)
      }
    })
    return module
  }
}

/**
 * 尝试给当前的路径添加扩展名，直到找到存在的文件为止
 * @param {*} modulePath
 * @param {*} extensions
 */
function tryExtensions(modulePath, extensions) {
    if (fs.existsSync(modulePath)) {
        return modulePath;
    }
    for (let i = 0; i < extensions.length; i++) {
        let filePath = modulePath + extensions[i];
        if (fs.existsSync(filePath)) {
            return filePath;
        }
    }
    throw new Error(`找不到${modulePath}`);
}

function getSource(chunk) {
    return `
   (() => {
    var modules = {
      ${chunk.modules.map(
        (module) => `
        "${module.id}": (module) => {
          ${module._source}
        },
      `
    )}
    };
    var cache = {};
    function require(moduleId) {
      var cachedModule = cache[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      var module = (cache[moduleId] = {
        exports: {},
      });
      modules[moduleId](module, module.exports, require);
      return module.exports;
    }
    var exports ={};
    ${chunk.entryModule._source}
  })();
   `;
}

module.exports = Compilation