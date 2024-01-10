let startHr = process.hrtime();
setTimeout(() => {
    console.log(process.hrtime(startHr));
}, 3000)
