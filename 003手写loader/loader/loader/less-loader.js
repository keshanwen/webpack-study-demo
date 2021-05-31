const less = require('less')

module.exports = function(source) {
  console.log(source,'less-loader')
  //let callback = this.async() webpack 有的
  let css = ''
  less.render(source,function(err,obj) {
    console.log(obj,'obj')
    //callback(err,obj.css)
    css = obj.css
  })
  return css
}  