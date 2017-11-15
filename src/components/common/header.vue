<template>
  <header>
    <div class="blog-name">
      <router-link :to="indexurl">{{ name }}</router-link>
    </div>
    <nav v-if="shownav !== false" class="top-nav">
      <router-link v-for="item in navs" :key="item.name" v-bind:to="item.link">{{ item.name }}</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'appHeader',
  props: ['shownav', 'indexurl'],
  data () {
    return {
      'name': 'YOUTH·FIGHTER',
      'navs': [
        {'name': '首页', 'link': '/youthfighter'},
        {'name': '全部文章', 'link': '/youthfighter/articleList'},
        {'name': '关于她', 'link': '/'},
        {'name': '学无止境', 'link': '/'},
        {'name': '留言', 'link': '/'}
      ]
    }
  }
}
</script>

<style scoped>
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
</style>
