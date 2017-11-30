// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
/* import './mocks/index' */
import 'iview/dist/styles/iview.css'
import './assets/styles/base.css'
import 'highlight.js/styles/default.css'
import axios from 'axios'
import { delCookie } from '../src/utils/cookie'
import allFilters from '../src/filters/index'
import allDirectives from '../src/directives/index'
Vue.config.productionTip = false
Vue.prototype.$http = axios
/* 定义全局的filter */
Object.keys(allFilters).forEach(key => {
  Vue.filter(key, allFilters[key])
})
/* 定义全局的directive */
Object.keys(allDirectives).forEach(key => {
  Vue.directive(key, allDirectives[key])
})
Vue.use(iView)
/* 定义request拦截器 */
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/* 定义response拦截器 */
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          delCookie('SESSION_ID')
          router.replace({path: '/management/login'})
      }
    }
    return Promise.reject(error.response.data)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
