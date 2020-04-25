<template>
  <div class="comment-item">
    <a-comment>
      <div slot="actions">
        <span @click="replyComment">回复</span>
      </div>
      <span slot="author">{{comment.authName}}</span>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        :alt="comment.authName"
      />
      <p slot="content">{{comment.comment}}</p>
      <a-comment v-if="showReply">
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <div slot="content">
          <a-textarea style="margin-bottom: 10px;" placeholder="输入回复消息" :rows="4" @change="commentChange" :value="value" />
          <a-button style="margin-right: 10px;" @click="cancelAdd">取消</a-button>
          <a-button :loading="submitting" @click="addComment" type="primary">确定</a-button>
        </div>
      </a-comment>
      <template v-if="comment.children && comment.children.length">
        <comment-item v-for="item in comment.children" :key="item.id" :comment="item" />
      </template>
    </a-comment>
  </div>
</template>

<script>
import { addCommentApi } from '@/mockData/comment'
export default {
  name: 'commentItem',
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      showReply: false,
      submitting: false,
      value: ''
    }
  },
  methods: {
    replyComment () {
      this.showReply = true
    },
    commentChange (e) {
      this.value = e
    },
    cancelAdd () {
      if (this.submitting) return
      this.value = ''
      this.showReply = false
    },
    addComment () {
      if (this.submitting) return
      this.submitting = true
      addCommentApi({}).then(res => {
        console.log(res)
        this.submitting = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
