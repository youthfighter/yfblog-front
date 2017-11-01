<template>
  <div id="app">
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container{
    background: url('./assets/image/articlebg.png') repeat;
    overflow: hidden;
    margin: 20px;
    box-shadow: #075498 0px 1px 10px;
}

</style>
