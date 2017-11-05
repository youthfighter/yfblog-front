import Vue from 'vue'
import Router from 'vue-router'

import blog from '@/components/pages/blog'
import management from '@/components/pages/management'
import managementLogin from '@/components/pages/management/login'
import managementRouter from './managementRouter'
import blogRouter from './blogRouter'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'blog' }
    },
    {
      path: '/youthfighter',
      name: 'blog',
      component: blog,
      children: blogRouter
    },
    {
      path: '/management',
      name: 'management',
      component: management,
      children: managementRouter
    },
    {
      path: '/management/login',
      name: 'managementLogin',
      component: managementLogin
    }
  ]
})
