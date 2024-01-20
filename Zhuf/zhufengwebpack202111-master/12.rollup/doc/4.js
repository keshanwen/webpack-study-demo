
function funcA() {
    var a = 'a';
    return a;
}
function funcB() {
    let a = funcA();
    console.log(a);
}


funcB();

/* function funcA() {
    var a = 'a';
    return a;
} */
//scope hoisting
function funcB() {
    var a = 'a';
    console.log(a);
}