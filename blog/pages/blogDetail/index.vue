<template>
  <div class="detail">detail</div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      blogDetail: {}
    }
  },
  mounted () {
    console.log('', this.$axios, this.$route)
    this.$axios.post('/api/blog/query/detail', { id: this.$route.query.id }).then(res => {
      if (!res.success) return
      this.blogDetail = res
    })
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
