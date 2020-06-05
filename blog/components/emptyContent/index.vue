<template>
  <div class="empty">
    <img :src="emptyIcon || '/empty_content_icon.png'" />
    <span>{{emptyText}}</span>
  </div>
</template>

<script>
export default {
  name: 'emptyContent',
  props: {
    emptyIcon: {
      type: String,
      default: ''
    },
    emptyText: {
      type: String,
      default: '暂无内容'
    }
  }
}
</script>

<style lang="less" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 10%;
}
</style>
