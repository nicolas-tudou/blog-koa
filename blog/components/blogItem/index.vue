<template>
  <div class="item">
    <div class="blog-logo" :style="{backgroundImage: 'url(' + blog.logo + ')'}"></div>
    <div class="blog">
      <p class="title" @click="toDetail">{{blog.title}}</p>
      <div class="info">
        <p class="info-item">作者:{{blog.authName}}</p>
        <p class="info-item">分类:{{blog.categoryName}}</p>
        <div class="info-item info-icon">
          <svg-icon icon-class="read" />
          <span class="info-text">{{blog.readNum}}</span>
        </div>
        <div :class="['info-item', 'info-icon', {active: likeFlag}]" @click.stop="likeBlog">
          <svg-icon icon-class="like" />
          <span class="info-text">{{blog.likeNum}}</span>
        </div>
        <div :class="['info-item', 'info-icon', {active: dislikeFlag}]" @click.stop="dislikeBlog">
          <svg-icon icon-class="dislike" />
          <span class="info-text">{{blog.dislikeNum}}</span>
        </div>
        <div class="info-item info-icon">
          <svg-icon icon-class="comment" />
          <span class="info-text">{{blog.commentNum}}</span>
        </div>
        <p class="info-item">更新时间:{{blog.updateTime}}</p>
      </div>
      <p class="brief">{{blog.brief}}</p>
      <div class="tag-box" v-if="blog.tags.length">
        <label>标签：</label>
        <blog-tag
          class="tag-item"
          v-for="tag in blog.tags"
          :key="tag.tagId"
          :tag="tag"
          />
      </div>
    </div>
  </div>
</template>

<script>
import blogTag from '@/components/tag'
import likeBlogMixin from '@/mixins/likeBlogMixin'
export default {
  name: 'blogItem',
  components: {
    blogTag
  },
  mixins: [likeBlogMixin],
  props: {
    blog: {
      type: Object,
      require: true
    }
  },
  methods: {
    /**
     * @function 跳转到详情
     */
    toDetail () {
      console.log(this.blog)
      this.$router.push({
        name: 'detail',
        query: {
          id: this.blog.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
