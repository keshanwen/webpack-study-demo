// 插件都是通过往 Webpack 生命周期的钩子中挂载任务函数实现的。
// ./remove-comments-plugin.js

class RemoveCommentsPlugin {

    apply (compiler) {
  
      compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
  
        // compilation => 可以理解为此次打包的上下文
  
        for (const name in compilation.assets) {
  
          if (name.endsWith('.js')) {
  
            const contents = compilation.assets[name].source()
  
            const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
  
            compilation.assets[name] = {
  
              source: () => noComments,
  
              size: () => noComments.length
  
            }
  
          }
  
        }
  
      })
  
    }
  
  }
  
  
  module.exports = RemoveCommentsPlugin