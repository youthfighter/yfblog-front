<template>
  <div class="hello">
    <bcard :title="title" :content="content"></bcard>
  </div>
  
</template>

<script>
import bcard from '@/components/common/card'

export default {
  name: 'HelloWorld',
  data () {
    return {
      title: '灯具公司复古风格PSD设计稿',
      content: '此模板为PSD设计稿，复古风格。首页主要突出产品，以及公司简介。手绘灯作为头部背景图片，这个比较特别。html可以做出灯一闪一闪的效果，或者说旁边有个按钮...'
    }
  },
  components: {
    bcard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
