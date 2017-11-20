<template>
  <div class="article-content">
    <Card>
      <Breadcrumb separator=">" class="bread-crumb">
        <BreadcrumbItem href="/youthfighter/articleList">全部文章</BreadcrumbItem>
        <BreadcrumbItem v-if="params.tag">{{params.tag}}</BreadcrumbItem>
      </Breadcrumb>
      <ul>
        <li v-for="article in articles" :key="article._id">
          <router-link :to="`/youthfighter/article/${article._id}`">
            <h3>{{article.title}}</h3>
          </router-link>  
          <div class="preview-time-tag">
            <span>
              <Icon type="android-alarm-clock"></Icon>
              发布时间：{{article.createDate | formateDate('YYYY-MM-DD HH:mm:ss') }}
            </span>
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
          <div class="preview-content-con">
            {{article.description}}
          </div>      
        </li>
      </ul>
      <Page :total="total" class="page-bar" show-total show-elevator @on-change="toPage"></Page>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      total: 0,
      params: {},
      spinShow: true
    }
  },
  created () {
    this.getArticlesByParams()
  },
  methods: {
    getArticlesByParams () {
      let _this = this
      let query = _this.$route.query
      _this.params.page = query.page ? query.page : ''
      _this.params.tag = query.tag ? query.tag : ''
      _this.$http.get(`/api/articles?page=${_this.params.page}&size=20&tag=${_this.params.tag}`)
        .then(res => {
          if (res.data && res.data.articles) {
            _this.total = res.data.total
            _this.articles.splice(0, _this.articles.length)
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
    },
    toPage (pageNum) {
      this.params.page = pageNum
      this.getArticlesByParams()
    }
  },
  watch: {
    '$route': 'getArticlesByParams'
  }
}
</script>
<style scoped>
li{
  border-bottom: 1px solid #edeff1;
  margin-bottom: 16px
}
.article-content{
  position: relative;
  min-height: 300px;
}
.preview-time-tag {
    font-size: 12px;
    color: gray;
    margin-top: 5px;
}
.preview-tip {
    margin-left: 20px;
    font-size: 12px;
    color: #c3c3c3;
}
.preview-content-con {
    border-top: 1px dashed #edeff1;
    padding: 12px 0 20px;
    margin-bottom: 20px;
}
.page-bar{
  margin-top: 20px;
  text-align: right
}
.bread-crumb{
  padding: 0 16px 10px;
  margin: 0 -16px 20px;
  font-size: 16px;
  border-bottom: 1px solid #edeff1
}
</style>
