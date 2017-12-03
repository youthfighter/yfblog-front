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
                <Icon type="eye"></Icon> 私密:&nbsp;&nbsp;&nbsp;
                <i-switch v-model="formItem.hidden">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </div>
              <div class="settings-item">
                <Icon type="ios-pricetags-outline"></Icon> 标签:&nbsp;&nbsp;&nbsp;
                <Tag v-for="(item,index) in formItem.tags" :key="index" :name="index" closable @on-close="removeTag">{{ item }}</Tag>
                <Poptip placement="left" width="150" v-if="tags && tags.length > 0">
                  <Button icon="ios-plus-empty" type="dashed" size="small">添加标签</Button>
                  <ul class="tags-list" slot="content">
                    <li v-for="(item,index) in tags" :key="index" @click="selectTag(index)">{{item}}</li>
                  </ul>
                </Poptip>
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
      tags: [],
      formItem: {
        id: '',
        title: '',
        content: '',
        hidden: false,
        tags: []
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
      if (this.formItem.id) {
        this.updateArticle()
      } else {
        this.insertArticle()
      }
    },
    insertArticle () {
      let _this = this
      this.$http.post('/api/articles', {
        title: _this.formItem.title,
        content: _this.formItem.content,
        hidden: _this.formItem.hidden,
        tags: _this.formItem.tags.join(',')
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
        hidden: _this.formItem.hidden,
        tags: _this.formItem.tags.join(',')
      })
      .then(res => {
        this.$router.push('/management/article/list')
      })
      .catch(err => {
        _this.saveBtnStatus = false
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
    },
    getTags () {
      let _this = this
      _this.$http.get('/api/tags')
        .then(res => {
          _this.tags.splice(0, _this.tags.length)
          if (res.data && res.data.tags) {
            res.data.tags.forEach(value => {
              if (_this.formItem.tags.indexOf(value.name) === -1) {
                _this.tags.push(value.name)
              }
            })
          }
        })
        .catch(err => {
          if (err) {
            this.$Message.error({
              content: '获取标签列表失败',
              duration: 10,
              closable: true
            })
          }
        })
    },
    selectTag (index) {
      this.formItem.tags.push(this.tags[index])
      this.tags.splice(index, 1)
    },
    removeTag (evt, index) {
      this.tags.push(this.formItem.tags[index])
      this.formItem.tags.splice(index, 1)
    }
  },
  created () {
    let id = this.$route.params.id
    let _this = this
    if (id) {
      _this.formItem.id = id
      _this.$http.get(`/api/owner/articles/${id}`)
      .then(res => {
        if (res.data) {
          _this.formItem.title = res.data.title
          _this.formItem.content = res.data.content
          _this.formItem.hidden = res.data.hidden
          if (res.data.tags) {
            res.data.tags.forEach(value => {
              _this.formItem.tags.push(value)
            })
          }
          _this.getTags()
        }
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
    } else {
      _this.getTags()
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
.tags-list{
  max-height: 120px;
  overflow-y: auto;
}
.tags-list li{
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  font-size: 16px;
  cursor: pointer;
}
</style>
