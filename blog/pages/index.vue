<template>
  <div class="bg">
    <div class="content-wrapper">
      <span>{{info.list.length}}</span>
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
import { getCategoryListApi } from '~/api'
export default {
  name: 'root',
  asyncData ({ $axios }) {
    return $axios.$post('/api/category/query/list').then(res => {
      return { info: res}
    }).catch(err => {
      console.log(999, err)
    })
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
