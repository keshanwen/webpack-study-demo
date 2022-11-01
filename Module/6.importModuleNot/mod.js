/*
    export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。
*/ 

function C() {
    this.sum = 0;
    this.add = function () {
      this.sum += 1;
    };
    this.show = function () {
      console.log(this.sum);
    };
  }
  
export let c = new C();