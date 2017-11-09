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
Mock.mock('/api/todo/insert', 'post', {
  '_id': '@id',
  'createDate': '@datetime',
  'author': 'youthfighter',
  'todo': '@cparagraph',
  'done|1-2': true
})
Mock.mock('/api/todo/all', 'get', {
  'toDoList|0-1': [{
    '_id': '@id',
    'createDate': '@datetime',
    'author': 'youthfighter',
    'todo': '@cparagraph',
    'done|1-2': true
  }]
})
Mock.mock('/api/article/new', 'get', {
  'newArticle|3-5': [{
    '_id': '@id',
    'name': '@ctitle'
  }]
})
Mock.mock('/api/article/hot', 'get', {
  'hotArticle|3-5': [{
    '_id': '@id',
    'name': '@ctitle'
  }]
})
Mock.mock('/api/article/one', 'get', {
  '_id': '@id',
  'title': '@ctitle',
  'content': '@cparagraph',
  'type|1-4': [{
    '_id': '@id',
    'tag': '@cname'
  }],
  'publishDatetime': '@datetime("yyyy-MM-DD -- HH:mm:ss")'
})
export default Mock
