const { SyncBailHook } = require('tapable')

let hook = new SyncBailHook(['name', 'age'])

hook.tap('fn1', function (name, age) {
  console.log('fn1--->', name, age)
  // return undefined
  return 24
})

hook.tap('fn2', function (name, age) {
  console.log('fn2--->', name, age)
  // return undefined
  return 24
})

hook.tap('fn3', function (name, age) {
  console.log('fn3--->', name, age)
})

hook.call('lg', 100)
