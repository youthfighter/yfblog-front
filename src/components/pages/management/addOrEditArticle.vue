<template>
    <div class="add-article">
        <Form :model="formItem" :rules="formRule" :label-width="50">
            <FormItem label="标题:" prop="title">
                <Input v-model="formItem.title" placeholder="请输入文章的标题" style="width:600px"></Input>
            </FormItem>
            <FormItem label="内容:" prop="content">
                <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 12,maxRows: 12}" style="width:600px" 
                placeholder="请输入博客内容(markdown格式)"></Input>
            </FormItem>
            <FormItem label="公开:" prop="hidden">
                <i-switch v-model="formItem.hidden">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                </i-switch>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="save" :loading='saveBtnStatus'>{{saveBtnText}}</Button>
                <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
            </FormItem>


        </Form>         
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
      let _this = this
      _this.saveBtnStatus = false
      _this.saveBtnText = '保存中...'
      this.$http.post('/api/article/add', {
        title: _this.formItem.title,
        content: _this.formItem.content
      })
      .then(res => {
        this.$router.push('/management/article/list')
      })
      .catch(err => {
        if (err) {
          this.$Message.error({
            content: '新增失败',
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
      this.id = id
      this.$http.get('/api/article/one', {
        id: _this.id,
        title: _this.formItem.title,
        content: _this.formItem.content
      })
      .then(res => {
        console.log(res)
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
</style>
