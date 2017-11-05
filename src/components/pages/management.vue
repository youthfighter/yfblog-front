<template>
  <div id="management">
      <appHeader :shownav="false" :indexurl="indexurl"></appHeader>
      <div class="container">
        <div class="nav">
          <appNav :selected="selected"></appNav>
        </div>
        <div class="content">
          <appBreadcrumb :location="location" class="app-breadcrumb"></appBreadcrumb>
          <router-view/>
        </div>   
        <div class="clearfix"></div>
      </div>
      <appFooter></appFooter>
  </div>
</template>

<script>
import appHeader from '@/components/common/header'
import appFooter from '@/components/common/footer'
import appBreadcrumb from '@/components/common/breadcrumb'
import appNav from '@/components/management/nav'
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
    appHeader,
    appFooter,
    appNav,
    appBreadcrumb
  },
  methods: {
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
    '$route': 'refreshNav'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body{
  font: 14px "微软雅黑", Arial, Helvetica, sans-serif;
  background: url('../../assets/image/top.jpg') no-repeat center top #075498;
}
header,article,footer{
  width: 1200px;
  margin: auto;
  overflow: hidden;
}
article{
  background: url('../../assets/image/articlebg.png') repeat;
}
.container{
  width: 1200px;
  margin: 0 auto;
  background-color: rgb(255, 255, 255)
}
.nav{
  width: 240px;
  float: left;
}
.content{
  padding: 10px 20px 20px;
  float: left;
  width: 960px;
}
.app-breadcrumb{
  font-size: 14px;
  margin-bottom: 30px;
}
</style>
