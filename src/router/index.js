import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from '../utils/cookie'
import blog from '@/components/pages/blog'
import management from '@/components/pages/management'
import managementLogin from '@/components/pages/management/login'
import managementRouter from './managementRouter'
import blogRouter from './blogRouter'
Vue.use(Router)

const router = new Router({
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
/* 路由控制 */
router.beforeEach((to, from, next) => {
  /* 没有匹配到路由页面 */
  if (to.matched.length === 0) {
    next('/youthfighter/404')
  } else {
    if (to.fullPath.startsWith('/management2')) {
      /* 管理页面路由控制 */
      if (to.fullPath.startsWith('/management/login')) {
        next()
      } else {
        if (getCookie('SESSION_ID')) {
          next()
        } else {
          next({path: '/management/login'})
        }
      }
    } else {
      /* 非管理页面路由控制 */
      next()
    }
  }
})

export default router
