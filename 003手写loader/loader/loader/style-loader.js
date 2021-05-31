module.exports = function(source) {
  console.log(source,'style-loader')
  let style = `
  let style = document.createElement("style");
  style.innerHTML = ${JSON.stringify(source)};
  document.head.appendChild(style);
  `
  // 注意点: 在loader中返回的数据必须是
  // 字符串类型或者是二进制类型
  return style
}