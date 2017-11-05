let Mock = require('mockjs')
let a = Mock.mock({
  'aa|1-4': [
    {'time': '@datetime'}
  ]
})
console.log(a)
