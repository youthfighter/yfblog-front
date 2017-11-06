<template>
  <div id="management">
    <div class="left-nav">
      <router-link to="/management" class="blog-name">YOUTH·FIGHTER</router-link>
      <appNav :selected="selected"></appNav>
    </div>
    <div class="main-header">
      <appBreadcrumb :location="location" class="app-breadcrumb"></appBreadcrumb>
      <div class="main-user">
        <appUser></appUser>
      </div>
      <div class="clearfix"></div>
    </div>      
      <div class="container">
        <router-view/>
      </div>
  </div>
</template>

<script>
import appBreadcrumb from '@/components/common/breadcrumb'
import appNav from '@/components/management/nav'
import appUser from '@/components/management/user'
import configs from '@/configs'
export default {
  name: 'app',
  data () {
    return {
      indexurl: '/management',
      location: [{label: '首页', href: '/management'}],
      selected: '/management'
    }
  },
  components: {
    appNav,
    appBreadcrumb,
    appUser
  },
  methods: {
    routeChange () {
      this.refreshNav()
    },
    refreshNav () {
      let path = this.$route.path
      let location = this.findPath(configs.management, path)
      location ? this.location = [{label: '首页', href: '/management'}, ...location] : this.location = [{label: '首页', href: '/management'}]
      this.selected = this.location[this.location.length - 1].href
    },
    findPath (array, path) {
      if (Array.isArray(array)) {
        for (let i = 0; i < array.length; i++) {
          let href = array[i].href
          if (href === path) {
            return [{ label: array[i].label, href: array[i].href }]
          }
          if (array[i].children) {
            let result = this.findPath(array[i].children, path)
            if (result) {
              result.unshift({ label: array[i].label, href: array[i].href })
              return result
            }
          }
        }
      }
    }
  },
  created () {
    this.refreshNav()
  },
  watch: {
    '$route': 'routeChange'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body{
  font: 14px "微软雅黑", Arial, Helvetica, sans-serif;
  background-color: #f0f0f0
}
.main-header{
  position: fixed;
  left: 240px;
  top: 0;
  right: 0;
  height: 60px;
  border-bottom: 1px solid #fff;
  background-color: #fff;
  padding: 0 20px;
  float: left;
  z-index: 10
}
.left-nav{
  position: fixed;
  width: 240px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #495060;
  z-index: 100
}
.blog-name{
  display: block;
  text-align: center;
  height: 60px;
  font-size: 24px;
  line-height: 60px;
  color: #fff;
}
.blog-name:hover,.blog-name:link,.blog-name:visited{
  text-decoration:none; 
  color:#fff; 
}
.container{
  position: absolute;
  top : 70px;
  left: 260px;
  right: 10px;
  bottom: 10px;
  background-color: #fff;
  overflow: auto;
  padding: 10px;
  z-index: 1;
}
.app-breadcrumb{
  font-size: 14px;
  line-height: 60px;
  display: inline-block;
}
.main-user{
  float: right;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}
</style>
