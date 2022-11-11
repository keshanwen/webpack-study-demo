let arr = [1, 3, 5];
let res = arr.reduce(function (initValue, curValue) {
    console.log(initValue, curValue);
    return initValue + curValue;
}, 100);
console.log(res);