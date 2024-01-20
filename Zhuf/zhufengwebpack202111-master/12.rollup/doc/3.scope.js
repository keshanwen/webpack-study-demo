let Scope = require('./ast/scope');
var a = 1;
function one() {
    var b = 2;
    function two() {
        var c = 3;
        console.log(a, b, c);
    }
    two();
}
one();


const globalScope = new Scope({ scopeName: '全局', parentScope: null, variableNames: ["a"] });
const oneScope = new Scope({ scopeName: 'oneScope', parentScope: globalScope, variableNames: ["b"] });
const twoScope = new Scope({ scopeName: 'twoScope', parentScope: oneScope, variableNames: ["c"] });

let aScope = twoScope.findDefiningScope('a');
console.log(aScope.scopeName);
let bScope = twoScope.findDefiningScope('b');
console.log(bScope.scopeName);
let cScope = twoScope.findDefiningScope('c');
console.log(cScope.scopeName);
let dScope = twoScope.findDefiningScope('d');
console.log(dScope);