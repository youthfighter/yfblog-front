<<template>
  <div class="to-do">
    <Card>
      <p slot="title">
        <Icon type="android-checkbox-outline"></Icon>
        代办事项{{"("+toDoList.length+")"}}
      </p>
      <a href="#" slot="extra" @click.prevent="showDialog">
        <Icon type="plus-round"></Icon>
      </a>
      <ul class="todolist" v-if="initLoading === 'success' && toDoList.length > 0">
        <li v-for="item in toDoList" :key="item._id" @click="item.done = !item.done">
          <Row>
            <Col span="2" style="">
              <Checkbox v-model="item.done" :id="item._id"></Checkbox></Col>
            <Col span="22" class="to-do-things done" v-if="item.done">
              {{item.todo}}
            </Col>
            <Col span="22" class="to-do-things" v-else>
              {{item.todo}}
            </Col>
          </Row>
        </li>
      </ul>
      <div class="todolist init-tip" v-if="toDoList.length === 0">
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
      _this.$http.post('/api/tasks/', {'task': _this.newToDoThings})
        .then(res => {
          _this.newToDoThings = ''
          _this.addToDoDialog = false
          _this.$Message.success('添加成功！')
          _this.saveLoading = true
          _this.toDoList.unshift(res.data)
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
      _this.$http.get('/api/todo/all')
        .then(res => {
          _this.toDoList = res.data.toDoList
          _this.initLoading = 'success'
        })
        .catch(err => {
          if (err) {
            _this.initLoading = 'error'
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
  padding : 50px;
  text-align: center;
}
</style>


