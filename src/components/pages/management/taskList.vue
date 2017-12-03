<template>
  <Card class="task-list" dis-hover>
    <Table :columns="columnsName" :data="data"></Table>
    <Page :total="total" :page-size="20" class="page-bar" show-total show-elevator @on-change="toPage"></Page>
  </Card>
</template>
<script>
import filters from '../../../filters/index'
export default {
  data () {
    return {
      columnsName: [
        {title: '序号', type: 'index', width: '70', align: 'center'},
        {title: '任务描述', key: 'task'},
        {title: '建立时间', key: 'fmCreateDate', align: 'center', width: '180'},
        {title: '完成时间', key: 'fmDoneDate', align: 'center', width: '180'},
        {
          title: '操作',
          align: 'center',
          width: '160',
          render: (h, params) => {
            if (!params.row.done) {
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
                      this.setTaskDone(params.row)
                    }
                  }
                }, '完成'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.removeTask(params.row)
                    }
                  }
                }, '删除')
              ])
            }
          }
        }
      ],
      data: [],
      total: 0
    }
  },
  created () {
    this.getTaskList(1)
  },
  methods: {
    getTaskList (page = 1, size = 20) {
      let _this = this
      _this.$http.get('/api/tasks')
        .then(res => {
          if (res.data && res.data.toDoList) {
            _this.total = res.data.total
            _this.data = res.data.toDoList.map(value => {
              value.fmCreateDate = filters.formateDate(value.createDate, 'YYYY-MM-DD hh:mm:ss')
              if (!value.doneDate) {
                value.fmDoneDate = '--'
              } else {
                value.fmDoneDate = filters.formateDate(value.doneDate, 'YYYY-MM-DD hh:mm:ss')
              }
              return value
            })
          }
        })
        .catch(err => {
          if (err) {
            _this.$message.error(err.msg ? err.msg : '未知故障')
          }
        })
    },
    toPage (num) {
      this.getTaskList(num)
    },
    setTaskDone (item) {
      let _this = this
      if (item.done) {
        this.$Message.info('已完成任务不可取消')
        return
      }
      this.$Modal.confirm({
        title: '警告',
        content: `确定任务【${item.task}】已完成？`,
        onOk () {
          _this.$http.patch(`/api/tasks/${item._id}`)
            .then(res => {
              item.done = true
            })
            .catch(err => {
              if (err && err.errMsg) _this.$Message.error(err.errMsg)
              else _this.$Message.error('设置任务完成失败')
            })
        }
      })
    },
    removeTask (row) {
      let _this = this
      _this.$Modal.confirm({
        title: '警告',
        content: `确定删除任务【${row.task}】?`,
        onOk () {
          _this.$http.delete(`/api/tasks/${row._id}`)
            .then(res => {
              _this.$Message.success('删除成功')
              _this.getTaskList()
            })
            .catch(err => {
              if (err) {
                _this.$Message.error('删除失败')
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



