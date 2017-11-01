<template>
  <Card style="width:360px" :shadow='true'>
    <div style="text-align:center;background: #ececec">
        <img src="../../assets/image/t02.jpg">
        <div class="title">{{ title }}</div>
        <div class="content">{{ content }}</div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'card',
  props: ['title', 'content']
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
  line-height: 22px;
  color: #666;
  word-break: break-all;
  text-align: left;
}
</style>
