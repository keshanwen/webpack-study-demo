// export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

// 报错
/*

    export 1

    let m = 1
    export m

    function fn() {}
    export fn

*/

// 正确

export let m = 1

let b = 1
export {
    b
}

let c = 1
export {
    c as crename
}

export function fn() {}

function fn2() {}
export {
    fn2
}


// export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
// 这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新，

export let foo = 'bar'
setTimeout( () => foo = 'hello wrold', 1000)