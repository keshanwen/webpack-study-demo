/**
 * 1.创建全局作用域globalScope
 * 2.globalScope.add('one');
 * 3.创一个新的子作用域oneScope
 * 4. oneScope.add('paramA');
 * 5.oneScope.add('a');
 * 6.oneScope.add('two');
 * 7.创建新的子作用域 twoScope 
 * 8. twoScope.add(paramB);
 */

function one(paramA) {
    var a = 1;
    function two(paramB) {
        var b = 2;
        function three(paramC) {
            console.log(a, b);
        }
        three();
    }
    two();
    console.log('1');
}
