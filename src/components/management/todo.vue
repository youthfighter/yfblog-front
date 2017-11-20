<<template>
  <div class="to-do">
    <Card>
      <p slot="title">
        <Icon type="android-checkbox-outline"></Icon>
        代办事项<span>{{"("+toDoCount+")"}}</span>
      </p>
      <a href="#" slot="extra" @click.prevent="showDialog">
        <Icon type="plus-round"></Icon>
      </a>
      <ul class="todolist" v-if="initLoading === 'success' && toDoList.length > 0">
        <li v-for="item in toDoList" :key="item._id" @click.prevent="setTaskDone(item)">
          <Row>
            <Col span="2" style="">
              <Checkbox v-model="item.done" :id="item._id"></Checkbox></Col>
            <Col span="22" class="to-do-things done" v-if="item.done">
              {{item.task}}
            </Col>
            <Col span="22" class="to-do-things" v-else>
              {{item.task}}
            </Col>
          </Row>
        </li>
      </ul>
      <div class="todolist init-tip" v-if="initLoading != 'error' && toDoList.length === 0">
        没有任务,<a href="#" @click.prevent="showDialog">点击添加</a>
      </div>
      <div class="todolist init-tip" v-if="initLoading === 'error'">
        加载失败,<a href="#" @click.prevent="getToDoList">点击重试</a>
      </div>
      <div class="todolist" v-if="initLoading !== 'init' && initLoading === 'init'">
        <Spin size="large" fix></Spin>
      </div>
    </Card>
    <Modal
      v-model="addToDoDialog"
      title="添加要做的事"
      :loading="saveLoading"
      @on-ok="save"
      >
      <Input v-model="newToDoThings" placeholder="请输入要做的事..." autofocus @on-enter="save"></Input>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toDoList: [],
      addToDoDialog: false,
      newToDoThings: '',
      saveLoading: false,
      initLoading: 'init'
    }
  },
  computed: {
    toDoCount () {
      if (Array.isArray(this.toDoList) && this.toDoList.length > 0) {
        let num = 0
        this.toDoList.forEach(value => {
          if (!value.done) num++
        })
        return num
      }
      return 0
    }
  },
  created () {
    this.getToDoList()
  },
  methods: {
    showDialog () {
      this.addToDoDialog = true
    },
    save () {
      if (this.newToDoThings === '') {
        this.addToDoDialog = false
        return
      }
      let _this = this
      _this.saveLoading = true
      _this.$http.post('/api/tasks', {'task': _this.newToDoThings})
        .then(res => {
          _this.newToDoThings = ''
          _this.addToDoDialog = false
          _this.$Message.success('添加成功！')
          _this.saveLoading = true
          if (res.data) _this.toDoList.unshift(res.data)
        })
        .catch(err => {
          if (err) {
            _this.$Message.error('添加失败！请稍后重试')
          }
          _this.addToDoDialog = false
          _this.loading = true
        })
    },
    getToDoList () {
      let _this = this
      _this.initLoading = 'init'
      _this.$http.get('/api/tasks')
        .then(res => {
          if (res.data && res.data.toDoList) {
            _this.toDoList.splice(0, _this.toDoList.length)
            res.data.toDoList.forEach(value => {
              _this.toDoList.push(value)
            })
          }
          _this.initLoading = 'success'
        })
        .catch(err => {
          if (err) {
            _this.initLoading = 'error'
          }
        })
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
    }
  }
}
</script>
<<style scoped>
.todolist{
  height: 150px;
  overflow: auto;
  position: relative;
  line-height:30px
}
.to-do-things{
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
}
.done{
  text-decoration: line-through;
  color: gray;
  font-weight: 100;
}
.init-tip{
  padding-top : 50px;
  text-align: center;
}
</style>


