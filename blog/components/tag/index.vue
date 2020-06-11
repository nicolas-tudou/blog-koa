<template>
  <span class="tag" :style="{background: tag.color}">{{tag.tagName}}</span>
</template>

<script>
export default {
  name: 'tag',
  props: {
    tag: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  padding: 0 3px;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
}
</style>
