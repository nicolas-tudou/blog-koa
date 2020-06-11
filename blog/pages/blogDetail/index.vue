<template>
  <div class="detail">
    <h2>{{blog.title}}</h2>
    <div class="blog-info">
      <p class="info-item">{{blog.authName}}</p>
      <div class="info-item blog-tag">
        <blog-tag
          class="tag-item"
          v-for="tag in blog.tags"
          :key="tag.tagId"
          :tag="tag"
          />
      </div>
      <p class="info-item">{{blog.updateTime}}</p>
      <div class="info-item icon-box"><svg-icon icon-class="read" /><span class="info-text">{{blog.readNum}}</span></div>
    </div>
    <div class="markdown-body" v-html="content" />
    <div class="view-info">
      <div class="icon-box" @click="commentClick">
        <svg-icon icon-class="comment" />
        <span>{{commentLength}}</span>
      </div>
      <div :class="['icon-box', {active: likeFlag}]" @click="likeBlog">
        <svg-icon icon-class="like" />
        <span>{{blog.likeNum}}</span>
      </div>
      <div :class="['icon-box', {active: dislikeFlag}]" @click="dislikeBlog">
        <svg-icon icon-class="dislike" />
        <span>{{blog.dislikeNum}}</span>
      </div>
    </div>
    <div class="comment" v-if="showComment">
      <input-item
        class="comment-input"
        ref="commentIput"
        :placeholder="placeholderText"
        :user="user"
        v-model="newComment"
        @concel="resetReply"
        @confirm="confirmComment"
      />
      <comment
        v-if="commentList.length"
        :commentList="commentList"
        @replyComment="replyComment"
      />
    </div>
    <blog-dialog
      v-model="showUserInfo"
      title="请添加如下信息后评论"
      @confirm="confirmUser">
      <div class="input-item">
        <label for="username">昵称：</label>
        <input id="username" type="text" placeholder="请输入昵称" v-model="user.userName" />
      </div>
      <div class="input-item">
        <label for="useravatar">头像：</label>
        <input id="useravatar" type="file" accept="image/*" @change="imgUpload" />
      </div>
    </blog-dialog>
  </div>
</template>

<script>
import blogTag from '@/components/tag'
import blogDialog from '@/components/dialog'
import likeBlogMixin from '@/mixins/likeBlogMixin'
import comment from '@/components/comment'
import inputItem from '@/components/inputItem'
import marked from 'marked'

export default {
  name: 'detail',
  components: {
    blogTag,
    blogDialog,
    comment,
    inputItem
  },
  mixins: [likeBlogMixin],
  data () {
    return {
      showComment: true,
      showUserInfo: false,
      placeholderText: '留个言吧～～',
      user: {
        name: '',
        avatar: ''
      },
      blog: {},
      content: '',
      commentLength: 0,
      newComment: '',
      replyCommentId: null,
      commentList: [
        {
          id: 1,
          blogId: 2,
          comment: 'idibwdeuwefvonoadnawndeiwad',
          userName: 'npml',
          userAvatar: '/blog_logo.jpg',
          createTime: '2020-06-09',
          children: [
            {
              id: 3,
              blogId: 22,
              comment: 'idibwdeuwefvonoadnawndeiwad',
              userName: 'modmawokednaowen',
              userAvatar: '/blog_logo.jpg',
              createTime: '2020-06-09'
            }
          ]
        },
        {
          id: 23,
          blogId: 3434,
          comment: 'idibwdeuwefvonoadnawndeiwad',
          userName: 'npml',
          userAvatar: '/blog_logo.jpg',
          createTime: '2020-06-12 00:30',
          children: [
            {
              id: 322,
              blogId: 2,
              comment: 'idibwdeuwefvonoadnawndeiwad',
              userName: 'npml',
              userAvatar: '/blog_logo.jpg',
              createTime: '2020-06-12 02:20',
              children: [
                {
                  id: 11243,
                  blogId: 2,
                  comment: 'idibwdeuwefvonoadnawndeiwad',
                  userName: 'npml',
                  userAvatar: '/blog_logo.jpg',
                  createTime: '2020-06-09',
                }
              ]
            },
            {
              id: 23231,
              blogId: 2,
              comment: 'idibwdeuwefvonoadnawndeiwad',
              userName: 'npml',
              userAvatar: '/blog_logo.jpg',
              createTime: '2020-06-09',
            }
          ]
        }
      ]
    }
  },
  asyncData (context) {
    return Promise.all([
      context.$axios.post('/api/blog/query/detail', { id: context.query.id }),
      context.$axios.post('/api/comment/query/list', { id: context.query.id })
    ]).then(([blog, commentList]) => {
      return {
        blog: blog.data,
        content: marked(blog.data.detail),
        commentList: commentList.data.list
      }
    })
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user')) || {}
    this.getCommentLength()
  },
  methods: {
    getCommentList () {
      this.$axios.post('/api/comment/query/list', { id: this.$route.query.id }).then(res => {
        this.commentList = res.data.list
        this.getCommentLength()
      })
    },
    commentClick () {
      let user = localStorage.getItem('user')
      if (!user) {
        this.showUserInfo = true
      }
      this.showComment = !this.showComment
    },
    imgUpload (e) {
      this.user.userAvatar = e.target.files[0]
    },
    getCommentLength (list = this.commentList) {
      this.commentLength += list.length
      list.forEach(item => {
        if (item.children && item.children.length) {
          this.getCommentLength(item.children)
        }
      })
    },
    confirmComment () {
      console.log('确认发表评论', this.replyCommentId, this.newComment, this.user)
      if (!this.user.userName || !this.user.userAvatar || !this.newComment) {
        alert('请补充信息')
        return
      }
      this.$axios.$post('/api/comment/set/add', {
        blogId: this.blog.id,
        parent: this.replyCommentId,
        comment: this.newComment,
        ...this.user
      }).then(res => {
        this.getCommentList()
      })
    },
    resetReply () {
      this.replyCommentId = null
      this.placeholderText = '留个言吧～～'
    },
    replyComment (comment) {
      console.log(comment)
      this.replyCommentId = comment.id
      this.placeholderText = '回复：' + comment.userName
      this.$refs.commentIput.focus()
    },
    /**
     * @function 点击用户信息弹窗
     */
    confirmUser () {
      if (!this.user.userName || !this.user.userAvatar) {
        alert('名称和头像必填')
        return
      }
      let form = new FormData()
      form.append('file', this.user.userAvatar)
      this.$axios.$post('/api/common/upload/image', form).then(res => {
        console.log(res.imgUrl)
        this.user.userAvatar = res.imgUrl
        localStorage.setItem('user', JSON.stringify(this.user))
        this.showUserInfo = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
