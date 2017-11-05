import Mock from 'mockjs'
// 使用 Mock
let data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
})
Mock.mock('/api/demo', 'get', data)
let data1 = Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
})
Mock.mock('/api/article/add', 'post', data1)
Mock.mock('/api/article/all', 'get', {
  'article|20': [{
    '_id': '@id',
    'createDate': '@datetime',
    'lastUpdate': '@datetime',
    'title': '@csentence',
    'author': '@cname',
    'hidden|1-2': true
  }],
  'total|50-100': 100
})
Mock.mock('/api/article/edit', 'post', {
  '_id': '@id',
  'createDate': '@datetime',
  'lastUpdate': '@datetime',
  'title': '@csentence',
  'author': '@cname',
  'hidden|1-2': true
})
Mock.mock('/api/article/one', 'get', {
  '_id': '@id',
  'createDate': '@datetime',
  'lastUpdate': '@datetime',
  'title': '@csentence',
  'author': '@cname',
  'content': '@cparagraph',
  'hidden|1-2': true
})
Mock.mock('/api/article/one', 'delete', {
  '_id': '@id',
  'createDate': '@datetime',
  'lastUpdate': '@datetime',
  'title': '@csentence',
  'author': '@cname',
  'content': '@cparagraph',
  'hidden|1-2': true
})
Mock.mock('/api/mangement/login', 'post', {
  'href': '/management'
})

export default Mock
