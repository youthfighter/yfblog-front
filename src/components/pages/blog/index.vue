<template>
  <div id="index">
      <section>
          <bcard v-for="(bcard,index) in cards" :key='index' :title='bcard.title' :content='bcard.content' :index="index"></bcard>
      </section>   
      <section>
          <btimeline v-for="item in articles" :key='item.index' :article="item"></btimeline>
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
          title: '背叛',
          content: '<p>入佛门六根不净，进商界狼性不足。</p><p>弱肉强食也罢，普渡众生也罢，关于世界的本质，必然是物竟天择，适者生存。</p>'
        },
        {
          title: '遥远的救世主',
          content: '<p>神即道，道法自然，如来。</p><p>杀富富不去，救贫贫不离。救主的文化唯救世主可说，救主不是人，是道，得救不是破了戒的狼吞虎咽，是觉悟。</p>'
        },
        {
          title: '天幕红尘',
          content: '<p>见路不走。</p><p>每个选择里都有变数，每一个变数又会引发一连串的变数，都会带来不一样的后果。</p>'
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
          if (res.data && res.data.articles) {
            res.data.articles.forEach(value => {
              _this.articles.push(value)
            })
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
