<template>
    <div ref="mynav">
        <Menu :theme="theme1" @on-select="turnUrl" :active-name="selected">
            <Submenu v-for="(item,index) in menu" :key="index" v-if="item.hide!=true" :name="item.href?item.href:''">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    {{item.label}}{{item.hide}}
                </template>
                <MenuItem :name="obj.href?obj.href:''" v-for="(obj,idx) in item.children" :key="idx">
                    {{ obj.label }}
                </MenuItem>
            </Submenu>
        </Menu>
    </div>     
</template>
<script>
import configs from '@/configs'
export default {
  data () {
    return {
      theme1: 'dark',
      menu: configs.management
    }
  },
  props: ['selected', 'height'],
  methods: {
    turnUrl (name) {
      this.$router.push(name)
    }
  }
}
</script>