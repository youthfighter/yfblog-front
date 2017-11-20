<template>
    <div class="add-article">
      <Row :gutter="16">
        <Col span='18'>
          <Card>
            <Form :model="formItem" :rules="formRule" :label-width="55">
              <FormItem label="标题:" prop="title">
                  <Input v-model="formItem.title" placeholder="请输入文章的标题"></Input>
              </FormItem>
              <FormItem label="内容:" prop="content">
                  <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 24,maxRows: 24}" 
                  placeholder="请输入博客内容(markdown格式)"></Input>
              </FormItem>
            </Form>
          </Card> 
        </Col>
        <Col span='6'>
          <Card>
            <p slot="title">
              <Icon type="paper-airplane"></Icon>
              发布
            </p>
            <div>
              <div class="settings-item">
                <Icon type="eye"></Icon> 公开度:&nbsp;&nbsp;&nbsp;
                <i-switch v-model="formItem.hidden">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </div>
              <div class="settings-item settings-footer">
                  <Button type="primary" @click="save" :loading='saveBtnStatus'>{{saveBtnText}}</Button>
                  <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>       
    </div>
</template>

<script>
export default {
  data () {
    return {
      spinShow: true,
      saveBtnText: '保存',
      saveBtnStatus: false,
      formItem: {
        id: '',
        title: '',
        content: '',
        hidden: false
      },
      formRule: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入博客内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    save () {
      this.saveBtnStatus = false
      this.saveBtnText = '保存中...'
      if (this.formItem.id) this.updateArticle()
      else this.insertArticle()
    },
    insertArticle () {
      let _this = this
      this.$http.post('/api/articles', {
        title: _this.formItem.title,
        content: _this.formItem.content,
        hidden: _this.formItem.hidden
      })
      .then(res => {
        this.$router.push('/management/article/list')
      })
      .catch(err => {
        _this.saveBtnStatus = true
        _this.saveBtnText = '保存'
        if (err) {
          this.$Message.error({
            content: '新增失败',
            duration: 10,
            closable: true
          })
        }
      })
    },
    updateArticle () {
      let _this = this
      let id = this.formItem.id
      this.$http.put(`/api/articles/${id}`, {
        title: _this.formItem.title,
        content: _this.formItem.content,
        hidden: _this.formItem.hidden
      })
      .then(res => {
        this.$router.push('/management/article/list')
      })
      .catch(err => {
        _this.saveBtnStatus = true
        _this.saveBtnText = '保存'
        if (err) {
          this.$Message.error({
            content: '修改失败',
            duration: 10,
            closable: true
          })
        }
      })
    },
    cancel () {
      this.$router.push('/management/article/list')
    }
  },
  created () {
    let id = this.$route.params.id
    let _this = this
    if (id) {
      this.formItem.id = id
      this.$http.get(`/api/articles/${id}`, {
        id: _this.id,
        title: _this.formItem.title,
        content: _this.formItem.content
      })
      .then(res => {
        _this.formItem.title = res.data.title
        _this.formItem.id = res.data._id
        _this.formItem.content = res.data.content
        _this.formItem.hidden = res.data.hidden
      })
      .catch(err => {
        if (err) {
          this.$Message.error({
            content: '打开文章编辑失败',
            duration: 10,
            closable: true
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.add-article{
    margin-bottom: 50px;
    position: relative;
}
.settings-item{
  margin-top: 20px;
}
.settings-footer{
  border-top: 1px solid rgb(243, 239, 241);
  padding-top: 20px
}
</style>
