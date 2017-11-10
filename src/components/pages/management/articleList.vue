<template>
    <div class="article-list">
      <div class="btn-grp">
        <Button type="primary" @click="addArticle">新增</Button>
      </div>
      <Table :columns="columns" :data="data"></Table>
      <Page :total="total" class="page-bar" show-total show-elevator @on-change="toPage"></Page>
    </div>          
</template>
<script>

export default {
  data () {
    return {
      columns: [
        {title: '创作时间', key: 'createDate', sortable: true},
        {title: '修改时间', key: 'lastUpdate', sortable: true},
        {title: '文章标题', key: 'title'},
        {title: '文章作者', key: 'author'},
        {
          title: '公开',
          key: 'hidden',
          width: 90,
          align: 'center',
          render: (h, params) => {
            const hidden = params.row.hidden
            return h('span', {}, hidden ? '公开' : '私密')
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
    getArticle (pageNum = 1, size = 20) {
      let _this = this
      let author = _this.user.name
      if (!author) _this.$router.push('/management/login')
      this.$http.get('/api/articles', {pageNum, size, author})
        .then(res => {
          if (res.data) {
            _this.data = res.data.article
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
.btn-grp{
  margin-bottom: 20px;
}
.page-bar{
  margin-top: 20px;
  text-align: right
}
</style>