<template>
  <div class="article">
    <Row :gutter="16">
      <Col span="18">
        <appArticleList></appArticleList>
      </Col>
      <Col span="6">
        <appArticleRecommend title="热门文章" :list="hotArticle"></appArticleRecommend>
        <appArticleRecommend title="最新文章" :list="newArticle" style="margin-top:20px"></appArticleRecommend>
      </Col>
    </Row>    
  </div>
</template>

<script>
import appArticleList from '@/components/blog/articleList'
import appArticleRecommend from '@/components/blog/articleRecommend'
export default {
  data () {
    return {
      hotArticle: [
        {
          _id: '5a06655a148a54063cf19127',
          name: '热门文章测试'
        },
        {
          _id: '5a06655a148a54063cf19127',
          name: '热门文章测试'
        },
        {
          _id: '5a06655a148a54063cf19127',
          name: '热门文章测试'
        }
      ],
      newArticle: [
        {
          _id: '5a06655a148a54063cf19127',
          name: '最新文章测试'
        },
        {
          _id: '5a06655a148a54063cf19127',
          name: '最新文章测试'
        },
        {
          _id: '5a06655a148a54063cf19127',
          name: '最新文章测试'
        }
      ]
    }
  },
  components: {
    appArticleList,
    appArticleRecommend
  }
}
</script>

<style scoped>
.article{
  padding: 10px;
}
</style>
