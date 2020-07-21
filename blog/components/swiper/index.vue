<template>
  <div class="swiper" id="__swiper_container__"><slot></slot></div>
</template>

<script>
let swiperEl = null
export default {
  name: 'swiper',
  data () {
    return {
      swiper: null,
      index: 1,
      dragging: false,
      swiperItemWidth: 0
    }
  },
  mounted () {
    this.initSwiper()
    this.autoPlay()
  },
  beforeDestory () {
    swiperEl.removeEventListener('mousedown', this.touchStart)
    swiperEl.removeEventListener('mousemove', this.touchMove)
    swiperEl.removeEventListener('mouseup', this.touchEnd)
    swiperEl.removeEventListener('mouseleave', this.mouseLeave)
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    initSwiper () {
      this.constructEl()
      this.skipTo(this.index)
      this.initEvent()
    },
    constructEl () {
      swiperEl = document.querySelector('#__swiper_container__')
      !swiperEl.parentElement.style.position && (swiperEl.parentElement.style.position = 'relative')
      let children = swiperEl.children
      let parentRect = swiperEl.parentElement.getBoundingClientRect()
      Array.from(children).forEach(el => {
        el.style.width = parentRect.width + 'px'
      })
      let first = children[0].cloneNode(true)
      let last = children[children.length -1].cloneNode(true)
      swiperEl.insertBefore(last, children[0])
      swiperEl.appendChild(first)
      this.swiperItemWidth = children[0].getBoundingClientRect().width
    },
    autoPlay () {
      setTimeout(() => {
        ++this.index
        this.skipTo(this.index)
        this.autoPlay()
      }, 3000)
    },
    skipTo (index) {
      swiperEl.style.left = this.swiperItemWidth * -index + 'px'
      swiperEl.style.transition = 'left 500ms ease-in-out'
      if (index === 0) {
        setTimeout(() => {
          this.index = swiperEl.children.length - 2
          swiperEl.style.transition = 'none'
          swiperEl.style.left = this.swiperItemWidth * -this.index + 'px'
        }, 500)
      }
      if (index === swiperEl.children.length - 1) {
        setTimeout(() => {
          this.index = 1
          swiperEl.style.transition = 'none'
          swiperEl.style.left = this.swiperItemWidth * -this.index + 'px'
        }, 500)
      }
    },
    initEvent () {
      swiperEl.addEventListener('mousedown', this.touchStart, false)
      swiperEl.addEventListener('mousemove', this.touchMove, false)
      swiperEl.addEventListener('mouseup', this.touchEnd, false)
      swiperEl.addEventListener('mouseleave', this.mouseLeave, false)
      window.addEventListener('resize', this.windowResize, false)
    },
    touchStart (e) {
      this.startX = e.clientX
      this.dragging = true
    },
    windowResize () {
      let parentRect = swiperEl.parentElement.getBoundingClientRect()
      Array.from(swiperEl.children).forEach(el => {
        el.style.width = parentRect.width + 'px'
      })
      this.swiperItemWidth = swiperEl.children[0].getBoundingClientRect().width
    },
    touchMove (e) {
      e.preventDefault()
      if (!this.dragging) return
      let offset = e.clientX - this.startX
      swiperEl.style.transition = 'none'
      swiperEl.style.left = this.swiperItemWidth * -this.index + offset + 'px'
    },
    mouseLeave () {
      this.dragging = false
      this.skipTo(this.index)
    },
    touchEnd (e) {
      if (e.clientX - this.startX > 200) {
        --this.index
      }
      if (e.clientX - this.startX < -200) {
        ++this.index
      }
      this.skipTo(this.index)
      this.dragging = false
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
