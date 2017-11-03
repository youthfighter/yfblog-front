import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/pages/index'
import management from '@/components/pages/management'
import managementRouter from './managementRouter'
import blogRouter from './blogRouter'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'index' }
    },
    {
      path: '/youthfighter',
      name: 'index',
      component: index,
      children: blogRouter
    },
    {
      path: '/management',
      name: 'management',
      component: management,
      children: managementRouter
    }
  ]
})
