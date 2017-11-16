<template>
  <div class="article">
    <Row :gutter="16">
      <Col span="18">
        <appArticleContent></appArticleContent>
      </Col>
      <Col span="6">
        <appHotArticles></appHotArticles>
        <appNewArticles style="margin-top:20px"></appNewArticles>
      </Col>
    </Row>    
  </div>
</template>

<script>
import appArticleContent from '@/components/blog/articleContent'
import appHotArticles from '@/components/blog/hotArticles'
import appNewArticles from '@/components/blog/newArticles'
export default {
  data () {
    return {}
  },
  components: {
    appArticleContent,
    appHotArticles,
    appNewArticles
  },
  created () {
/*     this.getHotArticle()
    this.getNewArticle() */
  },
  methods: {
    getHotArticle () {
      let _this = this
      _this.$http.get('/api/article/hot')
        .then(res => {
          _this.hotArticle = res.data.hotArticle
        })
    },
    getNewArticle () {
      let _this = this
      _this.$http.get('/api/article/new')
        .then(res => {
          console.log(res)
          _this.newArticle = res.data.newArticle
        })
    }
  }
}
</script>

<style scoped>
.article{
  padding: 10px;
}
</style>
