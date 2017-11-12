<template>
  <Dropdown @on-click="userCtr">
    <a href="javascript:void(0)">
      {{username}}
      <Icon type="arrow-down-b"></Icon>
    </a>
    <DropdownMenu slot="list">
      <DropdownItem name='changepsw'>修改密码</DropdownItem>
      <DropdownItem divided name='layout'>退出登录</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import { getUsername, clearUsername } from '../../utils/storage'
export default {
  data () {
    return {
      username: getUsername()
    }
  },
  methods: {
    userCtr (name) {
      switch (name) {
        case 'changepsw':
          this.changePsw()
          break
        case 'layout':
          this.layout()
          break
      }
    },
    changePsw () {
      this.$router.push('/management/user/changePsw')
    },
    layout () {
      let _this = this
      _this.$http.delete('/api/session')
        .then(res => {
          clearUsername()
          this.$router.push('/management/login')
        })
        .catch(err => {
          if (err) {
            this.$Message.error('退出登录失败！！')
          }
        })
    }
  }
}
</script>
<<style scoped>
</style>
