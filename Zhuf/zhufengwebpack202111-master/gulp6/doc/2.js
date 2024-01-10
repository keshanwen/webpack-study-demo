function one() {
    console.log('one');
}
function two() {
    console.log('two');
}
function three() {
    console.log('three');
}
function series(one, two, three) {
    return function () {
        one();
        two();
        three();
    }
}
let fn = series(one, two, three);
fn();