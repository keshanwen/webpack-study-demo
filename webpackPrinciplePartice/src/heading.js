// ./src/heading.js

export default () => {

    // console.log('hello wrold')
    // console.log('hi~~~~~ i am come from china')
    // // window.alert('kkkkk')
    // window.alert('hello wrold')
    const element = document.createElement('h2')
  
    element.textContent = 'Hello webpack'
    element.contentEditable = true
  
    // element.addEventListener('click', () => alert('Hello webpack'))
  
    return element
  
  }
  