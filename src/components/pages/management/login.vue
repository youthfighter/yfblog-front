<template>
  <div class="login">
    <div class="login-block"  @keydown.enter="handleSubmit">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名" size="large">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码" size="large">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">{{errmsg}}</p>
        </div>
      </Card>
    </div>
  </div>            
</template>
<script>
import md5 from 'md5'
export default {
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      errmsg: ''
    }
  },
  methods: {
    handleSubmit () {
      let _this = this
      this.$http.post('/api/mangement/login', {
        userName: _this.form.userName,
        password: md5(_this.form.password)
      })
        .then(res => {
          _this.$router.push('/management')
        })
        .catch(err => {
          if (err) {
            _this.errmsg = err.message
          }
        })
    }
  }
}
</script>
<style>
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app{
  width: 100%;
  height: 100%;
}
.login{
  width: 100%;
  height: 100%;
  background-image: url('../../../assets/image/login-bg.jpg');
  background-size: cover;
  background-position: 50%;
  position: relative;
}
.login-block{
    position: absolute;
    right: 200px;
    top: 50%;
    -webkit-transform: translateY(-70%);
    transform: translateY(-70%);
    width: 300px;
}
</style>