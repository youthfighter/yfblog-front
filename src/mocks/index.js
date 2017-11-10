import Mock from 'mockjs'
// 使用 Mock
let data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
})
Mock.mock('/api/demo', 'get', data)
Mock.mock('/api/article/edit', 'post', {
  '_id': '@id',
  'createDate': '@datetime',
  'lastUpdate': '@datetime',
  'title': '@csentence',
  'author': '@cname',
  'hidden|1-2': true
})
Mock.mock(/\/api\/articles\/[0-9]{1,40}/, 'get', {
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
/* task */
Mock.mock('/api/tasks', 'post', {
  '_id': '@id',
  'createDate': '@datetime',
  'author': 'youthfighter',
  'task': '@cparagraph',
  'done': false
})
Mock.mock('/api/tasks', 'get', {
  'toDoList|3-6': [{
    '_id': '@id',
    'createDate': '@datetime',
    'author': 'youthfighter',
    'task': '@cparagraph',
    'done': false
  }]
})
Mock.mock(/\/api\/tasks\/[0-9]{1,40}/, 'patch')
/* articles */
Mock.mock('/api/articles', 'get', {
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
Mock.mock(/\/api\/articles\/[0-9]{1,40}/, 'get', {
  '_id': '@id',
  'title': '@ctitle',
  'content': '@cparagraph',
  'type|1-4': [{
    '_id': '@id',
    'tag': '@cname'
  }],
  'publishDatetime': '@datetime("yyyy-MM-DD -- HH:mm:ss")'
})
Mock.mock('/api/articles', 'post')
Mock.mock(/\/api\/articles\/[0-9]{1,40}/, 'put')
/* session */
Mock.mock('/api/session', 'post', {
  'user': {
    name: 'admin2'
  }
})
Mock.mock('/api/session', 'delete')
export default Mock
