var flatten = require('arr-flatten');
function fn() {
    console.log(flatten(Array.from(arguments)));
}
fn(1, 2, 3);

fn([1, 2, 3], [4, 5, 6]);