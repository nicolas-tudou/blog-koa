<template>
  <div class="root">
    <side-bar/>
    <div class="root-content">
      <admin-header/>
      <div class="root-content-box">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from '@/components/sideBar'
import adminHeader from '@/components/header'

export default {
  name: 'root',
  components: {
    sideBar,
    adminHeader
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
