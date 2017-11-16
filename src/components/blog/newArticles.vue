<template>
  <div class="article-recommend" v-if="articles && articles.length>0">
    <Card>
      <p slot="title">
        <Icon type="paper-airplane"></Icon>
        最新文章
      </p>
      <ul>
        <li v-for="item in articles" :key="item._id" class="text-1">
          <router-link :to="`/youthfighter/article/${item._id}`">{{item.title}}</router-link>
        </li>
      </ul>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.getNewArticles()
  },
  methods: {
    getNewArticles () {
      let _this = this
      _this.$http.get('/api/newarticles')
        .then(res => {
          if (res.data && res.data.articles) {
            _this.articles.splice(1, _this.articles.length)
            res.data.articles.forEach(value => {
              _this.articles.push(value)
            })
          }
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
    }
  }
}
</script>
<style scoped>
ul li{
  height: 30px;
  line-height: 30px;
}
.text-1{
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  cursor: pointer;
}
.preview-publish-time {
    font-size: 12px;
    color: gray;
    margin-top: 5px;
}
.preview-tags-con {
    padding: 5px 0;
    margin: 10px 0;
}
.preview-tip {
    font-size: 12px;
    color: #c3c3c3;
}
.preview-content-con {
    border-top: 1px solid #edeff1;
    padding: 12px 0 20px;
    margin-bottom: 20px;
}
.order{
  height: 20px;
  width: 20px;
  background-color: pink;
}
</style>
