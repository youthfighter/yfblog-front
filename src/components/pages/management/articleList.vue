<template>
    <Card class="article-list">
      <p slot="title">
        <Icon type="ios-list-outline"></Icon>
        文章列表
      </p>
      <a href="#" slot="extra" @click.prevent="changeLimit">
        <Button type="primary" @click="addArticle" icon="plus-round" size="small">新增</Button>
      </a>
      <Table :columns="columns" :data="data"></Table>
      <Page :total="total" :page-size="20" class="page-bar" show-total show-elevator @on-change="toPage"></Page>
    </Card>
</template>
<script>
import filters from '../../../filters/index'
export default {
  data () {
    return {
      columns: [
        {title: '创作时间', key: 'fmCreateDate', sortable: true},
        {title: '修改时间', key: 'fmLastUpdate', sortable: true},
        {title: '文章标题', key: 'title'},
        {title: '文章作者', key: 'author'},
        {
          title: '公开',
          key: 'hidden',
          width: 90,
          align: 'center',
          render: (h, params) => {
            const hidden = params.row.hidden
            return h('span', {}, hidden ? '私密' : '公开')
          }
        },
        {
          title: '编辑',
          key: 'edit',
          width: 130,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.editArticle(params.row._id)
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      data: [],
      total: 0
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    addArticle () {
      this.$router.push('/management/article/add')
    },
    /* 暂时不提供删除 */
/*     deleteArticle (_id) {
      let _this = this
      _this.$Modal.confirm({
        title: '警告',
        content: '您确认删除该条数据？',
        onOk () {
          _this.$http.delete('/api/article/one', {_id})
            .then(res => {
              let newData = []
              for (let value of _this.data) {
                if (value && value._id !== _id) {
                  newData.push(value)
                }
              }
              _this.data = newData
              this.$Message.success('删除成功')
            })
            .catch(err => {
              if (err) {
                console.log('err')
              }
            })
        }
      })
    }, */
    editArticle (id) {
      this.$router.push(`/management/article/edit/${id}`)
    },
    getArticle (page = 1, size = 20) {
      let _this = this
      this.$http.get(`/api/owner/articles?page=${page}&size=${size}`)
        .then(res => {
          if (res.data) {
            _this.data.splice(0, _this.data.length)
            res.data.articles.forEach(value => {
              value.fmCreateDate = filters.formateDate(value.createDate, 'YYYY-MM-DD')
              value.fmLastUpdate = filters.formateDate(value.lastUpdate, 'YYYY-MM-DD')
              _this.data.push(value)
            })
            _this.total = res.data.total
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
    },
    toPage (pageNum) {
      this.getArticle(pageNum)
    }
  }
}
</script>
<style scoped>
.page-bar{
  margin-top: 20px;
  text-align: right
}
</style>
