export default {
  data () {
    return {
      likeFlag: false,
      dislikeFlag: false
    }
  },
  mounted () {
    this.dislikeFlag = localStorage.getItem('dislike-blog-' + this.blog.id)
    this.likeFlag = localStorage.getItem('like-blog-' + this.blog.id)
  },
  methods: {
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