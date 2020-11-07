<template>
  <div class="dialog-box" v-show="value" @click="maskClick">
    <div :class="['dialog-wrapper', { show: show }]" @click.stop="() => null">
      <div class="dialog-body">
        <div class="title">
          <template v-if="title">
            {{title}}
          </template>
          <slot v-else name="title" />
        </div>
        <div class="content">
          <template v-if="content">{{content}}</template>
          <slot v-else name="default" />
        </div>
      </div>
      <div class="footer">
        <template v-if="!footer">
          <div class="btn concel-btn" @click="concel">取消</div>
          <div class="btn confirm-btn" @click="confirm">确认</div>
        </template>
        <slot v-else name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogDialog',
  props: {
    value: {
      type: Boolean,
      require: true
    },
    title: String,
    content: String,
    footer: {
      type: Object,
      default: null
    }
  },
  computed: {
    show () {
      return this.value
    }
  },
  methods: {
    maskClick () {
      this.$emit('input', false)
    },
    confirm () {
      this.$emit('confirm')
    },
    concel () {
      this.$emit('input', false)
      this.$emit('concel')
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
