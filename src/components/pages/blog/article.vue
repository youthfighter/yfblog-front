<template>
  <div class="article">
    <Row :gutter="16">
      <Col span="18">
        <appArticleContent></appArticleContent>
      </Col>
      <Col span="6">
        <appArticleRecommend title="热门文章" :list="hotArticle"></appArticleRecommend>
        <appArticleRecommend title="最新文章" :list="newArticle" style="margin-top:20px"></appArticleRecommend>
      </Col>
    </Row>    
  </div>
</template>

<script>
import appArticleContent from '@/components/blog/articleContent'
import appArticleRecommend from '@/components/blog/articleRecommend'
export default {
  data () {
    return {
      hotArticle: [],
      newArticle: []
    }
  },
  components: {
    appArticleContent,
    appArticleRecommend
  },
  created () {
    this.getHotArticle()
    this.getNewArticle()
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
