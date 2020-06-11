<template>
  <div class="input-box">
    <div class="user-box" v-if="user">
      <img class="user-avatar" :src="user.userAvatar || '/blog_logo.jpg'" />
      <p class="user-name">{{user.userName || '匿名'}}</p>
    </div>
    <textarea id="comment-input-el" class="input-el" rows="3" :value="value" :placeholder="placeholder" @input="inputChange" />
    <div class="btn-box">
      <div class="btn confirm-btn" @click="confirm">发表评论</div>
      <div class="btn concel-btn" @click="concel">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputItem',
  props: {
    placeholder: String,
    user: Object,
    avatar: String,
    value: String
  },
  methods: {
    inputChange (e) {
      this.$emit('input', e.target.value)
    },
    focus () {
      document.getElementById('comment-input-el').focus()
    },
    concel () {
      this.$emit('concel')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="less" scoped>
.input-box {
  display: flex;
  align-items: flex-start;
  .user-box {
    margin-right: 10px;
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .user-name {
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  }
  .input-el {
    flex: 1;
  }
  .btn-box {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 14px;
    .btn:first-child {
      margin-bottom: 3px;
    }
  }
}
</style>
