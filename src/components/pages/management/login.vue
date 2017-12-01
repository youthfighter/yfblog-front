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
              <Input v-model="form.userName" placeholder="请输入用户名" size="large" autofocus>
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
            <FormItem prop="password">
              <Input type="password" v-model="form.code" placeholder="请输入验证码" size="large">
                <span slot="prepend">
                  <Icon :size="14" type="image"></Icon>
                </span>
                <a class="captcha" style="padding:0" slot="append" v-html="captcha" @click="getCaptcha"></a>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long v-if='loginFlag'>登录</Button>
              <Button @click="handleSubmit" type="primary" long v-else disabled>登录</Button>
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
import { setUsername } from '../../../utils/storage'
export default {
  data () {
    return {
      form: {
        userName: '',
        password: '',
        code: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      errmsg: '',
      captcha: '<h1>123</h1>'
    }
  },
  created () {
    this.getCaptcha()
  },
  methods: {
    handleSubmit () {
      let _this = this
      this.$http.post('/api/session', {
        name: _this.form.userName,
        password: md5(_this.form.password),
        code: _this.form.code
      })
        .then(res => {
          if (res.data) {
            setUsername(res.data.name)
            _this.$router.replace('/management/home')
          } else {
            _this.errmsg = '未知错误'
          }
        })
        .catch(err => {
          if (err) {
            _this.errmsg = err.errMsg
            if (err.errCode === 'user.captcha.error') _this.getCaptcha()
          }
        })
    },
    getCaptcha () {
      let _this = this
      _this.$http.get('/api/captcha')
        .then(res => {
          _this.captcha = res.data.captcha
        })
        .catch(err => {
          if (err) {
            _this.errmsg = '获取验证码失败'
          }
        })
    }
  },
  computed: {
    loginFlag () {
      if (this.form.password && this.form.userName && this.form.code) {
        return true
      } else {
        return false
      }
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
.login-tip{
  height: 22px;
  line-height: 22px;
  color: red;
}
.ivu-input-group-append{
  padding: 0!important;
}
.ivu-input-group-append .captcha{
  width: 100px;
  height: 30px;
}
</style>