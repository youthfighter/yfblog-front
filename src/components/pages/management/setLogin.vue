<template>
  <div class="set-login">
    <Row :gutter="16">
        <Col span="8">
          <Card :bordered="true">
            <p slot="title" class="card-title">
              首页登录图片
              <Button type="info" size="small" class="change-pic" @click="changeBgImage">更换图片</Button>
            </p>
            <div class="login-bgimage">
              <img src="/static/image/7047fc8f-f261-4401-9a5c-9ba42e70d50e.jpg">
            </div>
          </Card>
        </Col>
        <Col span="8">
        </Col>
        <Col span="8">
        </Col>
    </Row>
  </div>            
</template>
<script>
import { context } from '../../../configs'
export default {
  methods: {
    changeBgImage () {
      this.$router.push(`${context}/settings/login/bgimage`)
    }
  }
}
</script>
<style scoped>
.login-bgimage img{
  width: 100%;
  height: 100%;
}
.card-title{
  font-size: 14px;
}
.ivu-card-body{
  position: relative;
}
.change-pic{
  position: absolute;
  right: 20px;
}
</style>