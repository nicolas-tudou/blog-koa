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
        <a-select style="width: 260px;" v-model="blog.categoryId">
          <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.category}}</a-select-option>
        </a-select>
      </div>
      <div class="info-item none-bottom">
        <label>博客LOGO：</label>
        <a-upload
          action="/api/common/upload/img"
          listType="picture-card"
          accept="image/*"
          :fileList="fileList"
          :headers="imgUploadHeader"
          :remove="removeLogo"
          @preview="previewImage"
          @beforeUpload="beforeUpload"
          @change="logoChange"
        >
          <div v-if="!blog.logo">
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
          :defaultValue="defaultTags"
          :change="tagsChange"
          optionLabelProp="label"
        >
          <a-select-option
            v-for="tag in tagList"
            :key="tag.id"
            :value="tag.id"
            :label="tag.id"
            >
              <a-tag :color="tag.color" :ariaLabel="tag.id">{{tag.tagName}}</a-tag>
            </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="detail-content">
      <editor :options="{ value: blog.detail }" @change="editorChange" @load="editorLoad" />
    </div>
    <div class="detail-comment">
      <comment-item v-for="comment in commentList" :key="comment.id" :comment="comment" />
    </div>
    <a-modal v-model="showPreviewImg" :footer="null" @cancel="cancelPreview">
      <img style="width: 80%" :src="blog.logo" />
    </a-modal>
  </div>
</template>

<script>
import Editor from '@/components/editor'
import commentItem from '@/components/commentItem'

import uploadMixin from '@/mixins/uploadMixin'

import { getBlogDetailApi } from '@/mockData/blog'
import { getCategoryListApi } from '@/mockData/category'
import { getTagListApi } from '@/mockData/tag'
import { getCommentApi } from '@/mockData/comment'

export default {
  name: 'blogDetail',
  mixins: [uploadMixin],
  components: {
    commentItem,
    Editor
  },
  data () {
    return {
      fileList: [],
      categoryList: [],
      commentList: [],
      tagList: [],
      defaultTags: [],
      blog: {
        id: '',
        title: '',
        logo: '',
        brief: '',
        detail: '',
        tags: [],
        comment: []
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getBlogDetail()
      this.getComment()
    }
    this.getCategoryList()
    this.getTagList()
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
        this.getdefaultTags(res.tags)
      })
    },
    getComment () {
      getCommentApi({ id: this.$route.query.id }).then(res => {
        this.commentList = res.list
      })
    },
    getdefaultTags (tags) {
      tags.forEach(tag => {
        this.defaultTags.push(tag.tagId)
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
      console.log('tagsChange', e)
    },
    logoChange (e) {
      console.log(99, e.fileList[0])
    },
    removeLogo (file) {
      console.log(file)
      this.fileList = []
      this.blog.logo = ''
    },
    editorChange (e) {
      console.log('-----', e)
    },
    editorLoad (e) {
      console.log('=====', e)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
