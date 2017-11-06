<template>
  <div id="blog">
      <appHeader :indexurl="indexurl"></appHeader>
      <article>
        <div class="container">
          <router-view/>
        </div>      
      </article>    
      <appFooter></appFooter>
  </div>
</template>

<script>
import appHeader from '@/components/common/header'
import appFooter from '@/components/common/footer'
export default {
  name: 'app',
  data () {
    return {
      indexurl: '/youthfighter'
    }
  },
  components: {
    appHeader,
    appFooter
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
    background: url('../../assets/image/articlebg.png') repeat;
    overflow: hidden;
    margin: 20px;
    box-shadow: #075498 0px 1px 10px;
}
</style>
