## 代码分割有三种方式
- 入口点分割
- 动态导入和懒加载



老师，他为啥说说懒加载，这个不是预加载吗？ 

我现在只是代码分割，至于说是不是懒加载不一定
默认情况是懒加载
但是如果加了preload,就成预加载了


那代码里通过require来预加载某个路由页面，那import该组件还是不变吗 

vue
react
懒加载路由原理 import('./User')



page1 page1.js
page2 page2.js
page3 page3.js
asyncModule1   import( /* webpackChunkName: "asyncModule1" */'./asyncModule1');
defaultVendors-node_modules_jquery_dist_jquery_js   jquery
defaultVendors-node_modules_lodash_lodash_js  lodash
default-src_module1_js 
default-src_module2_js 


自定义组，是指什么？这两个default都不是自定义组吗？ 

page1里面包括runtime + page1的模块代码

现在为了缓存，把page1拆分两个代码块
一个是只包含运行时runtime,永远不变
一个就是page1这个代码块自己的业务代码，可能会变

page1.214bfaffe928e9a47d4e.js
page2.c51003dbee8fe3b7536e.js
page3.5ea9a93978f572c92f16.js
runtime~page1.daf013c5c9f5875ee47c.js
runtime~page2.5f2c6151de190b3dd763.js
runtime~page3.862caa1848a83628d6da.js


page1.464c5e26991989601e53.js
page2.c51003dbee8fe3b7536e.js
page3.5ea9a93978f572c92f16.js
runtime~page1.daf013c5c9f5875ee47c.js
runtime~page2.5f2c6151de190b3dd763.js
runtime~page3.862caa1848a83628d6da.js


 reuseExistingChunk: false
commons-src_index_js.d2f66e34e78bf158a53d.js

 reuseExistingChunk: true
main.7d1241ca66e3521ed3b1.js

如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
而不是生成新的代码块。
这可能会影响 chunk 的结果文件名。

If the current chunk contains modules already split out from the main bundle,
 it will be reused
  instead of a new one being generated. This can affect the resulting file name of the chunk.


21:47
梨子
对于公司现在单入口的项目，在webpack默认代码分割配置的基础上，我们自己还能做哪些配置上的优化呢? 
分析打包后的文件

21:54
tykdn撤回了一条消息
tykdn
webpack可以做到状态保持吗，比如打开一个弹窗框，改了弹出框里的代码，只拉去改的代码，不刷新浏览器，现在是会刷新浏览器导致弹框会关闭，每次都需要重新打开弹框，特别麻烦。vite是可以做到 
热更新，可以的

22:12

之前fetch只要在访问在控制台 elemets就可以看到效果

下节课我们手写一个prefetch插件