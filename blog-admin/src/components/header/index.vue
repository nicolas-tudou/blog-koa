<template>
  <div class="header">
    <div class="header-left">{{$route.meta.tabName || $route.meta.title}}</div>
    <a-dropdown :placement="'bottomCenter'">
      <span>{{user.name}}<a-icon type="down"/></span>
      <template #overlay>
        <a-button  style="padding: 4px 10px; cursor: pointer;" @click="signOut">退出</a-button>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: 'adminHeader',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    signOut () {
      console.log('sign out')
      this.$router.push({ name: 'signIn' })
    },
    getUserInfo () {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
