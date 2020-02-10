# 什么是loader?
webpack 默认只认识js文件，所以当weback遇到非js文件时就不知所措了。
Loader 这时候登场了，loader可以处理非js文件，它会告诉webpack怎么去处理非js文件。

# 运行npm run bulid 是怎么回事？
npm run build 其实是在运行webpack 
关于package.json里的script的命令可以参考 http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html

