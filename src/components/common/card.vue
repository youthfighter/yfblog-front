<template>
  <Card style="width:360px" :shadow='true'>
    <div style="text-align:center;background: #ececec;height:" :a="index">
        <img src="../../assets/image/3.jpg" v-if="index===0">
        <img src="../../assets/image/2.jpg" v-if="index===1">
        <img src="../../assets/image/1.jpg" v-if="index===2">
        <div class="title">{{ title }}</div>
        <div class="content" v-html="content"></div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'card',
  props: ['title', 'content', 'index']
}
</script>
<style scoped>
.ivu-card{
  margin: 10px;
  display: inline-block;
}
img{
  width:326px;
  height:309px;
  overflow: hidden;
}
.title{
  margin-top: 10px;
  font-size: 14px;
  text-shadow: #fff 1px 1px 0px;
  line-height: 26px;
  text-align: center;
  font-weight: bold;
  color: #226039;
}
.content{
  padding: 10px;
  height: 100px;
  overflow: hidden;
  line-height: 22px;
  color: #666;
  word-break: break-all;
  text-align: left;
}
</style>
