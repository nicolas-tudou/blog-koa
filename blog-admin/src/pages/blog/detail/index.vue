<template>
  <div class="detail">
    <div class="detail-info">
      <div class="info-item">
        <label for="blog-title">标题：</label>
        <a-input style="width: 260px;" id="blog-title" v-model="blog.title" placeholder="请输入博客标题" />
      </div>
      <div class="info-item">
        <label for="blog-brief">简介：</label>
        <a-textarea style="width: 600px;" id="blog-brief" v-model="blog.brief" placeholder="请输入博客简介" />
      </div>
      <div class="info-item">
        <label for="blog-category">分类：</label>
        <a-select
          style="width: 260px;"
          :dropdownStyle="{'z-index': 9999}"
          v-model="blog.categoryId">
          <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.category}}</a-select-option>
        </a-select>
      </div>
      <div class="info-item">
        <label>博客LOGO：</label>
        <div class="blog-logo-box" v-if="blog.logo" @click="previewImage">
          <a-icon type="close-circle-fill" spin class="delete-icon" @click.stop="removeLogo" />
          <img class="blog-logo" :src="blog.logo" />
        </div>
        <a-upload
          v-else
          action="/api/common/upload/image"
          listType="picture-card"
          accept="image/*"
          :headers="imgUploadHeader"
          @change="logoChange"
        >
          <div>
            <a-icon type="plus" />
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
      </div>
      <div class="info-item">
        <label id="info-tag">标签：</label>
        <a-select
          style="width: 260px;"
          mode="multiple"
          showArrow
          placeholder="请选择标签"
          :value="selectTags"
          @change="tagsChange"
          optionLabelProp="label"
        >
          <a-select-option
            v-for="tag in tagList"
            :key="tag.id"
            :value="tag.id"
            :label="tag.id"
            >
              <a-tag :color="tag.color" :ariaLabel="tag.id">{{tag.tag}}</a-tag>
            </a-select-option>
        </a-select>
      </div>
      <a-button :loading="loading" type="primary" @click="saveBlog">保存</a-button>
    </div>
    <div class="detail-content" v-if="loadEditor">
      <editor :detail="blog.detail" @change="editorChange" />
    </div>
    <div class="detail-comment" v-if="commentList && commentList.length">
      <comment-item v-for="comment in commentList" :key="comment.id" :comment="comment" />
    </div>
    <a-modal v-model="showPreviewImg" :closable="false" :footer="null" @cancel="cancelPreview">
      <div class="preview-box">
        <img style="width: 100%;" :src="blog.logo" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import Editor from '@/components/editor'
import commentItem from '@/components/commentItem'

import uploadMixin from '@/mixins/uploadMixin'

// import { getBlogDetailApi } from '@/mockData/blog'
// import { getCategoryListApi } from '@/mockData/category'
// import { getTagListApi } from '@/mockData/tag'
// import { getCommentApi } from '@/mockData/comment'

import { getBlogDetailApi, addNewBlogApi, updateBlogApi } from '@/api/blogApi'
import { getCategoryListApi } from '@/api/categoryApi'
import { getTagListApi } from '@/api/tagApi'
import { getCommentApi } from '@/api/commentApi'

export default {
  name: 'blogDetail',
  mixins: [uploadMixin],
  components: {
    commentItem,
    Editor
  },
  data () {
    return {
      loadEditor: false,
      loading: false,
      fileList: [],
      categoryList: [],
      commentList: [],
      tagList: [],
      blog: {
        id: '',
        title: '',
        categoryId: '',
        logo: '',
        brief: '',
        detail: localStorage.getItem('blogDetail') || '',
        tags: []
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getBlogDetail()
      // this.getComment()
    }
    this.loadEditor = true
    this.getCategoryList()
    this.getTagList()
  },
  computed: {
    selectTags () {
      let res = []
      this.blog.tags.forEach(id => {
        this.tagList.forEach(tag => {
          if (tag.id === id) {
            res.push(tag.tag)
          }
        })
      })
      return res
    }
  },
  methods: {
    getBlogDetail () {
      getBlogDetailApi({ id: this.$route.query.id }).then(res => {
        this.blog = res
        this.fileList = [{
          uid: 1,
          name: 'blog_logo.jpg',
          status: 'done',
          response: 'Server Error 500',
          url: res.logo
        }]
        this.loadEditor = true
      })
    },
    getComment () {
      getCommentApi({ id: this.$route.query.id }).then(res => {
        this.commentList = res.list
      })
    },
    getCategoryList () {
      getCategoryListApi().then(res => {
        this.categoryList = res.list
      })
    },
    getTagList () {
      getTagListApi().then(res => {
        this.tagList = res.list
      })
    },
    tagsChange (e) {
      this.blog.tags = e
    },
    logoChange (e) {
      if (e.file.status === 'done') {
        console.log(e.file)
        this.$message.success({ content: e.file.response.data.msg })
        this.blog.logo = e.file.response.data.imgUrl
      }
    },
    removeLogo () {
      this.blog.logo = ''
    },
    editorChange (e) {
      this.blog.detail = e
      localStorage.setItem('blogDetail', e)
    },
    validataBlog () {
      let checkProps = ['title', 'brief', 'logo', 'categoryId', 'detail']
      return checkProps.every(prop => this.blog[prop])
    },
    resetBlog () {
      localStorage.removeItem('blogDetail')
      this.blog = {
        id: '',
        title: '',
        categoryId: '',
        logo: '',
        brief: '',
        detail: '',
        tags: []
      }
    },
    saveBlog () {
      if (this.loading) return
      if (!this.validataBlog()) {
        this.$message.warning({ content: '请补充完整博客信息，再次提交' })
        return
      }
      this.loading = true
      if (this.$route.query.id) {
        updateBlogApi(this.blog).then(res => {
          console.log('update blog:', res)
          this.loading = false
          this.$message.success({ content: '更新成功' })
          this.resetBlog()
          this.$router.back()
        })
      } else {
        this.blog.authId = JSON.parse(localStorage.getItem('user')).id
        addNewBlogApi(this.blog).then(res => {
          console.log('add new blog:', res)
          this.loading = false
          this.$message.success({ content: '创建成功' })
          this.resetBlog()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
