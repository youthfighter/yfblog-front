<template>
	<div class="login-bgimage">
		<Row>
			<Upload action="/api/settings/loginBgImages" name="image" :format="['jpg','jpeg','png']" :on-success="uploadSuccess">
					<Button type="info" icon="ios-cloud-upload-outline">添加新图片1</Button>
			</Upload>
		</Row>
    <ul class="image-list" v-if="loginImage && loginImage.imageList">
      <li v-for="(item,index) in loginImage.imageList" :key="index">
        <img :src="item">
        <div v-if="loginImage.currImage === item">
          <Icon type="checkmark-round" class="selected"></Icon>
        </div>	
        <div v-else class="img-ctr" @click="setBgImageClick(index)">
          设为背景图
        </div>
      </li>
    </ul>
    <div v-else>还没有设置背景图...</div>
	</div>            
</template>
<script>
export default {
  data () {
    return {
      loginImage: {
        imageList: [],
        currImage: null
      }
    }
  },
  created () {
    this.getAllBgImages()
  },
  methods: {
    setBgImageClick (index) {
      let _this = this
      this.$Modal.confirm({
        title: '确认操作',
        content: '<p>确认设置该图片登录页图片？此操作立即生效。</p>',
        onOk: () => {
          _this.setBgImage(index)
        }
      })
    },
    setBgImage (index) {
      let _this = this
      this.$http.put(`api/settings/loginBgImages/${index}`)
        .then(res => {
          _this.loginImage.currImage = _this.loginImage.imageList[index]
        })
        .catch(err => {
          if (err) {
            _this.$Message.error('设置背景图片失败，请稍后重试')
          }
        })
    },
    getAllBgImages () {
      let _this = this
      this.$http.get('/api/settings/loginBgImages')
        .then(res => {
          res.data.imageList.forEach(value => {
            _this.loginImage.imageList.push(value)
          })
          _this.loginImage.currImage = res.data.currImage
        })
        .catch(err => {
          if (err && err.errCode !== 'image.not.set') {
            _this.$Message.error('获取背景图片失败，请刷新页面重试')
          }
        })
    },
    uploadSuccess (res, file) {
      this.loginImage.imageList.push(res.data)
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