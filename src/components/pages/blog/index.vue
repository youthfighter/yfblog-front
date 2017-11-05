<template>
  <div id="index">
      <section>
          <bcard v-for="(bcard,index) in cards" :key='index' :title='bcard.title' :content='bcard.content'></bcard>
      </section>   
      <section>
          <btimeline v-for="item in [1, 2, 3, 4]" :key='item'></btimeline>
      </section> 
  </div>
</template>

<script>
import bcard from '@/components/common/card'
import btimeline from '@/components/common/timeline'
export default {
  name: 'app',
  data () {
    return {
      cards: [
        {
          title: '灯具公司复古风格PSD设计稿',
          content: '此模板为PSD设计稿，复古风格。首页主要突出产品，以及公司简介。手绘灯作为头部背景图片，这个比较特别。html可以做出灯一闪一闪的效果，或者说旁边有个按钮...'
        },
        {
          title: '灯具公司复古风格PSD设计稿',
          content: '此模板为PSD设计稿，复古风格。首页主要突出产品，以及公司简介。手绘灯作为头部背景图片，这个比较特别。html可以做出灯一闪一闪的效果，或者说旁边有个按钮...'
        },
        {
          title: '灯具公司复古风格PSD设计稿',
          content: '此模板为PSD设计稿，复古风格。首页主要突出产品，以及公司简介。手绘灯作为头部背景图片，这个比较特别。html可以做出灯一闪一闪的效果，或者说旁边有个按钮...'
        }
      ]
    }
  },
  components: {
    bcard,
    btimeline
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
