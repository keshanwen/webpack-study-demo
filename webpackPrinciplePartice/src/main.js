// ./src/index.js

import createHeading from './heading.js'
import './main.css'
import about from './about.md'

// console.log(about)

// 希望 about => '<h1>About</h1><p>this is a markdown file.</p>'

const heading = createHeading()

document.body.append(heading)

// HMR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let lastHeading = heading
module.hot.accept('./heading.js', () => {
    // 当 ./editor.js 更新，自动执行此函数
    console.log('./heading.js 更新了～～')

   // 临时记录更新前编辑器内容
   const value = lastHeading.innerHTML
   // 移除更新前的元素
   document.body.removeChild(lastHeading)
   // 创建新的编辑器
   // 此时 createEditor 已经是更新过后的函数了
   lastHeading = createHeading()
   // 还原编辑器内容
   lastHeading.innerHTML = value
   // 追加到页面
   document.body.appendChild(lastHeading)
 
  })