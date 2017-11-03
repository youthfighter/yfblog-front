<template>
  <div id="blog">
      <appHeader></appHeader>
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
  components: {
    appHeader,
    appFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    background: url('../../assets/image/articlebg.png') repeat;
    overflow: hidden;
    margin: 20px;
    box-shadow: #075498 0px 1px 10px;
}
</style>
