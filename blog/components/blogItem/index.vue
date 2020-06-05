<template>
  <div class="item" @click="toDetail">
    <div class="blog-logo" :style="{backgroundImage: 'url(' + blog.logo.replace(/todo-fordream\.club/, 'localhost:8081') + ')'}"></div>
    <div class="blog">
      <p class="title">{{blog.title}}</p>
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
      <div class="tag" v-if="blog.tags.length">
        <label>标签：</label>
        <span
          class="tag-item"
          v-for="tag in blog.tags"
          :key="tag.tagId"
          :style="{background: tag.color}"
          >{{tag.tagName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogItem',
  props: {
    blog: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      likeFlag: localStorage.getItem('like-blog-' + this.blog.id),
      dislikeFlag: localStorage.getItem('dislike-blog-' + this.blog.id)
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
    },
    /**
     * @function 点赞
     */
    likeBlog () {
      if (this.likeFlag) {
        localStorage.removeItem('like-blog-' + this.blog.id)
        this.likeFlag = false
        return
      }
      this.likeFlag = true
      localStorage.setItem('like-blog-' + this.blog.id, '1')
    },
    /**
     * @function 点踩
     */
    dislikeBlog () {
      if (this.dislikeFlag) {
        localStorage.removeItem('dislike-blog-' + this.blog.id)
        this.dislikeFlag = false
        return
      }
      this.dislikeFlag = true
      localStorage.setItem('dislike-blog-' + this.blog.id, '1')
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
