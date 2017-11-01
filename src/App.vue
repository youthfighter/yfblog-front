<template>
  <div id="app">
    <header>
      <div class="blog-name">
        <router-link to="/">YOUTH·FIGHTER</router-link>
      </div>
      <nav class="top-nav">
        <router-link to="/">首页</router-link>
        <router-link to="/">关于我</router-link>
        <router-link to="/">关于她</router-link>
        <router-link to="/">学无止境</router-link>
        <router-link to="/">留言</router-link>
      </nav>
    </header>
    <article>
      <div class="container">
        <router-view/>
      </div>      
    </article>    
    <footer>生命不息，奋斗不止</footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.blog-name{
  padding: 40px 0;
  text-align: left;
}
header a{
  color: white;
  text-align: left;
}
header a:link, a:visited, a:active {
    text-decoration: none;
    color: #fff;
}
.blog-name a{
  font-size: 66px;
}
.top-nav{
  padding-bottom: 30px;
}
.top-nav a{
  margin-right: 30px;
  font-size: 20px;
}
footer{
  text-align: center;
  padding: 20px 0;
  font-size: 16px;
}
.container{
    background: url('./assets/image/articlebg.png') repeat;
    overflow: hidden;
    margin: 20px;
    box-shadow: #075498 0px 1px 10px;
}

</style>
