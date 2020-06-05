<template>
  <div class="bg">
    <div class="content-wrapper">
      <div class="header">
        <img src="/blog_logo.jpg" />
        <div class="header-info">
          <p class="header-title">土豆的博客</p>
          <p>brain</p>
        </div>
      </div>
      <div class="content">
        <nuxt-child/>
      </div>
      <!-- <div class="footer">Copyright © 浙ICP备19019129号</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'root'
}
</script>

<style lang="less" scoped>
@import './index';
</style>
