<template>
  <div id="index">
      <section>
          <bcard v-for="(bcard,index) in cards" :key='index' :title='bcard.title' :content='bcard.content'></bcard>
      </section>   
      <section>
          <btimeline v-for="item in articles" :key='item._id':article="item"></btimeline>
      </section> 
  </div>
</template>

<script>
import bcard from '@/components/common/card'
import btimeline from '@/components/common/timeline'
export default {
  name: 'app',
  data () {
    return {
      cards: [
        {
          title: '功能开发中',
          content: '功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中...'
        },
        {
          title: '功能开发中',
          content: '功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中..'
        },
        {
          title: '功能开发中',
          content: '功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中..'
        }
      ],
      articles: []
    }
  },
  components: {
    bcard,
    btimeline
  },

  created () {
    this.getArticle()
  },
  methods: {
    getArticle (page = 0, size = 20) {
      let _this = this
      this.$http.get(`/api/articles?page=${page}&size=${size}`)
        .then(res => {
          if (res.data) {
            _this.articles = res.data.articles
          }
        })
        .catch(err => {
          if (err) {
            this.$Message.error({
              content: '查询失败，请刷新重试',
              duration: 10,
              closable: true
            })
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
