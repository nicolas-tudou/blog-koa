<template>
  <div class="list">
    <span
      v-for="(category, index) in categoryList"
      :key="category.id"
      :class="['list-item', {active: index === selectIndex}]"
      @click="categorySelect(index, category)">{{category.category}}</span>
  </div>
</template>

<script>
export default {
  name: 'categoryList',
  props: {
    categoryList: {
      type: Array,
      require: true
    },
    selectIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * @function 点击分类
     * @param {Number} index index of category list
     * @param {Object} category selected categrory object
     */
    categorySelect (index, category) {
      if (index === this.selectIndex) return
      this.$emit('change', index, category)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
