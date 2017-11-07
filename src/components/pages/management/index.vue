<template>
  <Upload action="//jsonplaceholder.typicode.com/posts/" @on-success='ok' @on-error='err'>
    <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
  </Upload>          
</template>
<script>
export default {
  methods: {
    ok () {
      console.log('ok')
    },
    err () {
      console.log('err')
    }
  }
}
</script>
<style scoped>
.app-breadcrumb{
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>