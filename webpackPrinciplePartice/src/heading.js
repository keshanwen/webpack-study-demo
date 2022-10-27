// ./src/heading.js

export default () => {

    console.log('hello wrold')
    const element = document.createElement('h2')
  
    element.textContent = 'Hello webpack'
  
    element.addEventListener('click', () => alert('Hello webpack'))
  
    return element
  
  }
  