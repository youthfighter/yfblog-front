<template>
  <Card class="tag-list" dis-hover>
    <p slot="title">
      <Icon type="ios-list-outline"></Icon>
      标签列表
    </p>
    <a href="#" slot="extra" @click.prevent="addTag">
      <Button type="primary" @click.prevent="addTag" icon="plus-round" size="small">新增</Button>
    </a>
    <Table :columns="columnsName" :data="data"></Table>
    <Page :total="total" :page-size="20" class="page-bar" show-total show-elevator @on-change="toPage"></Page>
    <Modal
      v-model="tagDialog"
      title="标签内容"
      :loading="saveLoading"
      @on-ok="saveTag"
      >
      <Input v-model="tagText" placeholder="请输入标签内容..." autofocus @on-enter="saveTag"></Input>
    </Modal>
  </Card>
</template>
<<script>
import filters from '../../../filters/index'
export default {
  data () {
    return {
      columnsName: [
        {title: '序号', type: 'index', width: '70', align: 'center'},
        {title: '标签名称', key: 'name'},
        {title: '建立时间', key: 'fmCreateDate', align: 'center', width: '180'},
        {
          title: '操作',
          align: 'center',
          width: '160',
          render: (h, params) => {
            if (!params.row.done) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.removeTag(params.row)
                    }
                  }
                }, '删除')
              ])
            }
          }
        }
      ],
      data: [],
      total: 0,
      tagDialog: false,
      saveLoading: false,
      tagText: '',
      ruleValidate: [

      ]
    }
  },
  created () {
    this.getTagList(1)
  },
  methods: {
    getTagList (page = 1, size = 20) {
      let _this = this
      _this.$http.get('/api/tags')
        .then(res => {
          if (res.data && res.data.tags) {
            _this.data.splice(0, _this.data.length)
            res.data.tags.forEach(value => {
              value.fmCreateDate = filters.formateDate(value.createDate, 'YYYY-MM-DD hh:mm:ss')
              _this.data.push(value)
            })
            _this.total = res.data.total
          }
        })
        .catch(err => {
          if (err) {
            _this.$message.error(err.msg ? err.msg : '未知故障')
          }
        })
    },
    toPage (num) {
      this.getTagList(num)
    },
    addTag () {
      this.tagText = ''
      this.tagDialog = true
    },
    saveTag () {
      let _this = this
      _this.saveLoading = true
      _this.tagDialog = false
      let name = _this.tagText
      if (!name) {
        _this.$Message.error('请输入标签内容')
        _this.saveLoading = false
        return
      }
      _this.$http.post('/api/tags', {name})
        .then(res => {
          _this.saveLoading = false
          if (res.data) {
            let value = res.data
            value.fmCreateDate = filters.formateDate(value.createDate, 'YYYY-MM-DD hh:mm:ss')
            _this.data.push(value)
          }
        })
        .catch(err => {
          _this.saveLoading = false
          if (err) {
            let msg = err.errMsg ? err.errMsg : '标签保存失败'
            _this.$Message.error(msg)
          }
        })
    },
    removeTag (row) {
      let _this = this
      this.$Modal.confirm({
        title: '警告',
        content: `确定删除标签【${row.name}】？`,
        onOk () {
          _this.$http.delete(`/api/tags/${row._id}`)
            .then(res => {
              _this.data.splice(row._index, 1)
              _this.$Message.success('删除成功')
            })
            .catch(err => {
              if (err) {
                this.$Message.error('删除失败，请稍后重试')
              }
            })
        }
      })
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



