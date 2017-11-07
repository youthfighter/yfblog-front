<template>
	<div class="login-bgimage">
		<Row>
			<Upload action="">
					<Button type="info" icon="ios-cloud-upload-outline">添加新图片</Button>
			</Upload>
		</Row>
		<ul class="image-list">
			<li v-for="(item,index) in bgImages" :key="index" :data-id="item._id">
				<img :src="item.src">
        <div v-if="currImageId == item._id">
          <Icon type="checkmark-round" class="selected"></Icon>
        </div>	
				<div v-else class="img-ctr" @click="setBgImageClick(item._id)" :data-id="item._id">
					设为背景图
				</div>
			</li>
      <Spin size="large" fix :style="showfix"></Spin>
		</ul>	
	</div>            
</template>
<script>
export default {
  data () {
    return {
      bgImages: [
        {_id: 1, src: '/static/image/7047fc8f-f261-4401-9a5c-9ba42e70d50e.jpg'},
        {_id: 2, src: '/static2/image/7047fc8f-f261-4401-9a5c-9ba42e70d50e.jpg'}
      ],
      currImageId: '1',
      showfix: {
        display: 'none'
      }
    }
  },
  created () {
    this.getBgImage()
  },
  methods: {
    setBgImageClick (_id) {
      this.$Modal.confirm({
        title: '确认操作',
        content: '<p>确认设置该图片登录页图片？此操作立即生效。</p>',
        onOk: () => {
          this.setBgImage(_id)
        }
      })
    },
    setBgImage (_id) {
      let _this = this
      this.$http.post('/api/login/bgImage', {_id})
        .then(res => {
          _this.currImageSrc = res.data._id
        })
        .catch(err => {
          if (err) {
            _this.$Message.error('设置背景图片失败，请稍后重试')
          }
        })
    },
    getBgImage () {
      this.$http.get('/api/login/bgImage')
        .then(res => {
          this.bgImages = res.data.bgImages
          this.currImageId = res.data.currImageId
        })
        .catch(err => {
          if (err) {
            this.$Message.error('获取背景图片失败，请刷新页面重试')
          }
        })
    }
  }
}
</script>
<style scoped>
.image-list{
  position: relative;
}
.image-list li{
	margin: 10px;
	width:200px;
	height:120px;
	overflow: hidden;
	display:inline-block;
	position: relative
}
.img-ctr{
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background: rgba(0,0,0,.6);
	line-height: 120px;
	color: #fff;
	color: 14px;
	text-align: center;
	display: none;
}
.image-list li:hover>.img-ctr{
	display: block;
	cursor: pointer;
}
img{
	width: 100%;
	height: auto;
}
.selected{
	color: #2d8cf0;
	position: absolute;
	right: 5px;
	bottom: 5px;
}
</style>