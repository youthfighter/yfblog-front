<template>
  <div class="article-content">
    <Card>
      <h1>{{article.title}}</h1>
      <p class="preview-publish-time" :a="article.createDate">
        <Icon type="android-alarm-clock"></Icon>
        发布时间：{{article.createDate | formateDate('YYYY-MM-DD HH:mm:ss') }}
      </p>
      <div class="preview-tags-con">
        <b class="preview-tip" v-if="article.tags && article.tags.length > 0">
          <Icon type="ios-pricetags-outline"></Icon>
          &nbsp;标签：
          <Tag color="blue" v-if="index%4 == 0" v-for="(item,index) in article.tags" :key="index">
            <router-link color="blue" :to="`/youthfighter/articleList?tag=${item}`">{{item}}</router-link>
          </Tag>
          <Tag color="green" v-if="index%4 == 1" v-for="(item,index) in article.tags" :key="item._id">
            <router-link color="blue" :to="`/youthfighter/articleList?tag=${item}`">{{item}}</router-link>
          </Tag>
          <Tag color="red" v-if="index%4 == 2" v-for="(item,index) in article.tags" :key="item._id">
            <router-link color="blue" :to="`/youthfighter/articleList?tag=${item}`">{{item}}</router-link>
          </Tag>
          <Tag color="yellow" v-if="index%4 == 3" v-for="(item,index) in article.tags" :key="item._id">
            <router-link color="blue" :to="`/youthfighter/articleList?tag=${item}`">{{item}}</router-link>
          </Tag>
        </b>
      </div>
      <div class="preview-content-con" v-html="article.html">
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {},
      spinShow: true
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      let _this = this
      let _id = _this.$route.params.id
      _this.$http.get(`/api/articles/${_id}`)
        .then(res => {
          _this.spinShow = false
          console.log(res.data)
          _this.article = res.data
        })
        .catch(err => {
          if (err.statusCode === 'article.not.find') {
            _this.$router.push('/youthfighter/404')
          } else {
            _this.$router.push('/youthfighter/500')
          }
        })
    }
  },
  watch: {
    '$route': 'getArticle'
  }
}
</script>
<style scoped>
.article-content{
  position: relative;
  min-height: 300px;
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
</style>
