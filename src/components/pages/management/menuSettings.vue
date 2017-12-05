<template>
  <div class="menu-settings">
    <div class="btn-ctr">
      <Button type="primary" @click="showDialog('add')">新建子节点</Button>
      <Button type="primary" @click="showDialog('edit')">编辑节点</Button>
      <Button type="primary" @click="upNode">上移节点</Button>
      <Button type="primary" @click="downNode">下移节点</Button>
      <Button type="primary">删除节点</Button>
      <Button type="primary" @click="saveTree">保存页面结构</Button>
    </div>
    <div class="menu-tree">
      <Row :gutter="16">
        <Col span="12" class="border-right">
          <h4 class="margin-bottom-20">页面结构树</h4>
          <Tree :data="menuSettings" ref="menuSettingsTree"></Tree>
        </Col>
        <Col span="12">
        </Col>
      </Row>
    </div>
    <Modal 
      v-model="treeDialogShow"
      title="编辑节点"
    >
      <Form :model="treeNodeModel" label-position="left" :label-width="60">
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
      menuSettings: [
        {
          title: '根目录',
          key: 'root',
          expand: true
        }
      ]
    }
  },
  methods: {
    showDialog (type) {
      let selectedNodes = this.$refs['menuSettingsTree'].getSelectedNodes()
      if (selectedNodes.length === 1) {
        if (type === 'add') {
          this.treeNodeModel = {}
        } else if (type === 'edit') {
          this.treeNodeModel = selectedNodes[0]
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
      let selectedNode = this.$refs['menuSettingsTree'].getSelectedNodes()[0]
      if (this.dialogType === 'add') {
        const children = selectedNode.children || []
        children.push(this.treeNodeModel)
        this.$set(selectedNode, 'children', children)
        this.closeDialog()
      } else if (this.dialogType === 'edit') {
        this.closeDialog()
      }
    },
    saveTree () {
      console.log(this.menuSettings)
    },
    upNode () {
      let selectedNode = this.getSelectedNode()
      if (selectedNode) {
      }
    },
    downNode () {

    },
    getSelectedNode () {
      let selectedNodes = this.$refs['menuSettingsTree'].getSelectedNodes()
      if (selectedNodes.length === 1) {
        return selectedNodes[0]
      } else {
        this.$Message.error('请选择一个节点')
      }
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
</style>

