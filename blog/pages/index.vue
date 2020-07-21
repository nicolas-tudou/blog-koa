<template>
  <div class="bg">
    <div class="content-wrapper">
      <!-- <div class="header">
        <img src="/blog_logo.jpg" />
        <div class="header-info">
          <p class="header-title">土豆的博客</p>
          <p>brain</p>
        </div>
      </div> -->
      <div class="swiper-wrapper">
        <swiper>
          <div class="swiper-item" v-for="item in swiperItems" :key="item.value">
            <img :src="item.img">
          </div>
        </swiper>
      </div>
      <div class="content">
        <nuxt-child/>
      </div>
      <!-- <div class="footer">Copyright © 浙ICP备19019129号</div> -->
    </div>
  </div>
</template>

<script>
import swiper from '@/components/swiper'
export default {
  name: 'root',
  components: {
    swiper
  },
  data () {
    return {
      swiperItems: [
        {
          value: 1,
          img: '/upload/image/all.png'
        },
        {
          value: 2,
          img: '/upload/image/blk.png'
        },
        {
          value: 3,
          img: '/upload/image/flq.png'
        },
        {
          value: 4,
          img: '/upload/image/lbnm.png'
        },
        {
          value: 5,
          img: '/upload/image/lf.png'
        },
        {
          value: 6,
          img: '/upload/image/lsa.png'
        },
        {
          value: 7,
          img: '/upload/image/qb.png'
        },
        {
          value: 8,
          img: '/upload/image/sl.png'
        },
        {
          value: 9,
          img: '/upload/image/sz.png'
        },
        {
          value: 10,
          img: '/upload/image/wsp.png'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
