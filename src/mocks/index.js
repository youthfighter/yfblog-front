import Mock from 'mockjs'

// 使用 Mock
let data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
})
Mock.mock('api/demo', 'get', data)
export default Mock
