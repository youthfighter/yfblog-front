import home from '@/components/pages/management/index'
import notFound from '@/components/pages/management/404'
import articleList from '@/components/pages/management/articleList'
import addOrEditArticle from '@/components/pages/management/addOrEditArticle'
import setCard from '@/components/pages/management/setCard'
import setLogin from '@/components/pages/management/setLogin'
import bgimage from '@/components/pages/management/loginBgImage'
import taskList from '@/components/pages/management/taskList'
const context = '/management'
export default [
  {
    path: `${context}/home`,
    name: 'home',
    component: home
  },
  {
    path: `${context}/404`,
    name: '404',
    component: notFound
  },
  {
    path: `${context}/article/list`,
    name: 'articleList',
    component: articleList
  },
  {
    path: `${context}/article/add`,
    name: 'articleList',
    component: addOrEditArticle
  },
  {
    path: `${context}/article/edit/:id`,
    name: 'editArticle',
    component: addOrEditArticle
  },
  {
    path: `${context}/settings/card/list`,
    name: 'setCard',
    component: setCard
  },
  {
    path: `${context}/settings/login`,
    name: 'setLogin',
    component: setLogin
  },
  {
    path: `${context}/settings/login/bgimage`,
    name: 'bgimage',
    component: bgimage
  },
  {
    path: `${context}/tasks`,
    name: 'taskList',
    component: taskList
  }
]
