<template>
  <Dropdown @on-click="userCtr">
    <a href="javascript:void(0)">
      youthfighter
      <Icon type="arrow-down-b"></Icon>
    </a>
    <DropdownMenu slot="list">
      <DropdownItem name='changepsw'>修改密码</DropdownItem>
      <DropdownItem divided name='layout'>退出登录</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
  export default {
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
        console.log('layout')
      }
    }
  }
</script>
<<style scoped>
</style>
