import './index.css'

console.log('index.ts~~~~~~~~~~~~~~~~~`')

setTimeout( () => {
    (document.getElementById('app') as HTMLElement).innerText = 'hello, world'
    console.log('setimeout~~~~~~~~~~~~~~~~')
},1000)


console.log(CUSTOMCONSTANTS,'CUSTOMCONSTANTS~~~~~~~~~~~~~')



