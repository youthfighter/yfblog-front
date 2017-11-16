<template>
  <div class="article">
    <Row :gutter="16">
      <Col span="18">
        <appArticleList></appArticleList>
      </Col>
      <Col span="6">
        <appHotArticles></appHotArticles>
        <appNewArticles style="margin-top:20px"></appNewArticles>
      </Col>
    </Row>    
  </div>
</template>

<script>
import appArticleList from '@/components/blog/articleList'
import appHotArticles from '@/components/blog/hotArticles'
import appNewArticles from '@/components/blog/newArticles'
export default {
  data () {
    return {}
  },
  components: {
    appArticleList,
    appHotArticles,
    appNewArticles
  }
}
</script>

<style scoped>
.article{
  padding: 10px;
}
</style>
