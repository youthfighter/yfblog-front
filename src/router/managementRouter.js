import index from '@/components/pages/management/index'
import notFound from '@/components/pages/management/404'
import articleList from '@/components/pages/management/articleList'
import addOrEditArticle from '@/components/pages/management/addOrEditArticle'
import setCard from '@/components/pages/management/setCard'
import login from '@/components/pages/management/login'
export default [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '/management/404',
    name: '404',
    component: notFound
  },
  {
    path: '/management/article/list',
    name: 'articleList',
    component: articleList
  },
  {
    path: '/management/article/add',
    name: 'articleList',
    component: addOrEditArticle
  },
  {
    path: '/management/article/edit/:id',
    name: 'editArticle',
    component: addOrEditArticle
  },
  {
    path: '/management/settings/card/list',
    name: 'setCard',
    component: setCard
  }
]
