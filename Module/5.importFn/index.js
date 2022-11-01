
document.addEventListener('click', () => {
    console.log('click~~~~~~~~~~~~~~~')
    import('./data.js').then((res) => {
        console.log(res)
        const { a, b, default: defaultValue } = res
        console.log(a)
        console.log(b)
        console.log(defaultValue)
    }).catch( (error) => {
        console.warn(error)
    })
})