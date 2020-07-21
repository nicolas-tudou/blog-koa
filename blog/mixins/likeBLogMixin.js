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
      console.log(111)
      this.$axios.$post('/api/blog/set/like', { id: this.blog.id, step: this.likeFlag ? -1 : 1 }).then(res => {
        if (this.likeFlag) {
          localStorage.removeItem('like-blog-' + this.blog.id)
          --this.blog.likeNum
          this.likeFlag = false
          return
        }
        ++this.blog.likeNum
        this.likeFlag = true
        localStorage.setItem('like-blog-' + this.blog.id, '1')
      })
    },
    /**
     * @function 点踩
     */
    dislikeBlog () {
      this.$axios.$post('/api/blog/set/dislike', { id: this.blog.id, step: this.likeFlag ? -1 : 1 }).then(res => {
        if (this.dislikeFlag) {
          localStorage.removeItem('dislike-blog-' + this.blog.id)
          --this.blog.dislikeNum
          this.dislikeFlag = false
          return
        }
        ++this.blog.dislikeNum
        this.dislikeFlag = true
        localStorage.setItem('dislike-blog-' + this.blog.id, '1')
      })
    }
  }
}