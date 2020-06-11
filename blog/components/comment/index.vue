<template>
  <div class="comment-box">
    <div class="comment-item" v-for="comment in commentList" :key="comment.id">
      <div class="comment-info">
        <img class="user-avatar" :src="comment.userAvatar || '/blog_logo.jpg'" />
        <span class="user-name" v-if="!parent">{{comment.userName}}：</span>
        <span class="user-name" v-else>{{comment.userName}}<span class="reply-text">回复</span>{{parent}}</span>
        <span class="text">{{comment.comment}}</span>
        <span class="comment-time">{{getTime(comment.createTime)}}</span>
        <div class="btn reply-btn" @click="replyComment(comment)">回复</div>
      </div>
      <div class="reply-box" v-if="comment.children && comment.children.length">
        <comment
          :parent="comment.userName"
          :commentList="comment.children"
          @replyComment="replyComment" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    parent: String,
    commentList: {
      type: Array,
      require: true
    }
  },
  methods: {
    getTime (time) {
      let ms = new Date().getTime() - new Date(time.replace(/-/g, '/'))
      let mins = Math.floor(ms / (60 * 1000))
      if (mins < 60) {
        return mins + '分钟前'
      }
      let hours = Math.floor(mins / 60)
      if (hours < 24) {
        return hours + '小时前'
      }
      return Math.floor(hours / 24) + '天前'
    },
    replyComment (comment) {
      console.log(comment)
      this.$emit('replyComment', comment)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
