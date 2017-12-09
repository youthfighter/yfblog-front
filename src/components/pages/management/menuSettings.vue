<template>
  <div class="menu-settings">
    <div class="btn-ctr">
      <Button type="primary" @click="showDialog('add')">新建子节点</Button>
      <Button type="primary" @click="showDialog('edit')">编辑节点</Button>
      <Button type="primary" @click="deleteNode">删除节点</Button>
    </div>
    <div class="menu-tree">
      <h3 class="margin-bottom-20">页面结构树</h3>
      <Tree :data="menuSettings" ref="menuSettingsTree"></Tree>
    </div>
    <Modal 
      v-model="treeDialogShow"
      title="编辑节点"
    >
      <Form :model="treeNodeModel" label-position="left" :label-width="80">
        <FormItem label="页面名称">
          <Input v-model="treeNodeModel.title"></Input>
        </FormItem>
        <FormItem label="是否隐藏">
            <i-switch v-model="treeNodeModel.hidden" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
            </i-switch>
        </FormItem>
        <FormItem label="页面路径">
          <Input v-model="treeNodeModel.href"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="closeDialog">取消</Button>
        <Button type="primary" size="large" @click="saveNode">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      treeDialogShow: false,
      treeNodeModel: {},
      dialogType: '',
      menuSettings: []
    }
  },
  created () {
    this.getPages()
  },
  methods: {
    showDialog (type) {
      let selectedNode = this.getSelectedNode()
      if (selectedNode) {
        if (type === 'add') {
          this.treeNodeModel = {
            expand: true,
            parentId: selectedNode.id,
            parent: selectedNode,
            index: selectedNode.children ? selectedNode.children.length : 0
          }
        } else if (type === 'edit') {
          this.treeNodeModel = (Object.assign({}, selectedNode))
        }
        this.dialogType = type
        this.treeDialogShow = true
      } else {
        this.$Message.error('请选择一个节点')
      }
    },
    closeDialog () {
      this.treeDialogShow = false
    },
    saveNode () {
      let _this = this
      let selectedNode = _this.getSelectedNode()
      if (_this.dialogType === 'add') {
        _this.$http.post('/api/page', _this.getArrayNode())
          .then(res => {
            selectedNode.children = selectedNode.children || []
            _this.treeNodeModel.id = res.data.id
            selectedNode.children.push(_this.treeNodeModel)
          })
          .catch(err => {
            if (err) {
              this.$Message.error(err.errMsg ? err.errMsg : '添加节点失败')
            }
          })
        _this.closeDialog()
      } else if (_this.dialogType === 'edit') {
        _this.$http.put(`/api/page/${selectedNode.id}`, _this.getArrayNode())
          .then(res => {
            selectedNode.title = _this.treeNodeModel.title
            selectedNode.hidden = _this.treeNodeModel.hidden
            selectedNode.href = _this.treeNodeModel.href
            this.$Message.info('修改成功')
          })
          .catch(err => {
            if (err) {
              _this.$Message.error(err.errMsg ? err.errMsg : '修改失败')
            }
          })
        this.closeDialog()
      }
    },
    deleteNode () {
      let selectedNode = this.getSelectedNode()
      let id = selectedNode.id
      let _this = this
      if (selectedNode) {
        _this.$http.delete(`/api/page/${id}`)
          .then(res => {
            let parent = selectedNode.parent
            let index = selectedNode.index
            parent.children.splice(index, 1)
          })
          .catch(err => {
            if (err) {
              _this.$Message.error(err.errMsg ? err.errMsg : '删除节点失败')
            }
          })
      }
    },
    getSelectedNode () {
      let selectedNodes = this.$refs['menuSettingsTree'].getSelectedNodes()
      if (selectedNodes.length === 1) {
        return selectedNodes[0]
      } else {
        this.$Message.error('请选择一个节点')
      }
    },
    getPages () {
      let _this = this
      _this.$http.get('/api/pages')
        .then(res => {
          if (res.data.length === 0) {
            _this.$http.post('/api/page', {title: '根节点'})
              .then(res => {
                _this.menuSettings = _this.jsonToTree([res.data])
              })
              .catch (err => {
                if (err) {
                  _this.$Message.error('初始化根节点失败')
                }
              })
          } else {
            _this.menuSettings = _this.jsonToTree([res.data])
          }
          
        })
        .catch(err => {
          _this.$Message.error(err.errMsg ? err.errMsg : '获取页面列表失败')
        })
    },
    jsonToTree (data, parent = {}) {
      let id = parent.id
      let itemArr = []
      for (let val of data) {
        if (val.parentId === id) {
          let newNode = JSON.parse(JSON.stringify(val))
          newNode.children = this.jsonToTree(data, newNode)
          newNode.parent = parent
          let index = isNaN(val.index) ? 0 : val.index
          itemArr[index] = newNode
        }
      }
      return itemArr
    },
    getArrayNode () {
      let { id, title, parentId, hidden = false, index = 0 } = this.treeNodeModel
      return {id, title, parentId, hidden, index}
    }
  }
}
</script>
<style scoped>
.menu-tree{
  padding: 10px 20px;
}
.menu-settings{
  background-color: #fff
}
.btn-ctr{
  padding: 10px 20px;
  border-bottom: 1px solid lightgray;
}
.border-right{
  border-right: 1px solid lightgray
}
.margin-bottom-20{
  margin-bottom: 20px;
}
.ivu-tree-title{
  font-size: 14px
}
</style>

