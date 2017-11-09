import index from '@/components/pages/blog/index'
import article from '@/components/pages/blog/article'
import notFound from '@/components/pages/blog/404'
import error from '@/components/pages/blog/500'
export default [
  {
    path: '/youthfighter',
    name: 'index',
    component: index
  },
  {
    path: '/youthfighter/article/:id',
    name: 'article',
    component: article
  },
  {
    path: '/youthfighter/404',
    name: '404',
    component: notFound
  },
  {
    path: '/youthfighter/500',
    name: '500',
    component: error
  }
]
