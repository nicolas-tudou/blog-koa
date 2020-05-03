<template>
  <div class="blog">
    <div class="filter-box">
      <div class="filter-item">
        <label>博客名称：</label>
        <a-input style="width: 160px;" placeholder="请输入博客名" v-model="reqData.title" />
      </div>
      <div class="filter-item">
        <label>分类：</label>
        <a-select style="width: 120px;" v-model="reqData.categoryId">
          <a-select-option :value="-1">全部</a-select-option>
          <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.category}}</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <label>作者：</label>
        <a-select style="width: 120px;" v-model="reqData.authId">
          <a-select-option :value="-1">全部</a-select-option>
          <a-select-option v-for="user in userList" :key="user.id" :value="user.id">{{user.userName}}</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <label>博客状态：</label>
        <a-select style="width: 120px;" v-model="reqData.status" :options="blogStatus" />
      </div>
      <div class="filter-item">
        <a-button type="primary" :loading="tableLoading" @click="queryBlog">查询</a-button>
        <a-button style="margin-left: 20px;" @click="resetQuery">重置</a-button>
        <a-button style="margin-left: 20px;" @click="addNewBlog">新增博客</a-button>
      </div>
    </div>
    <a-table
      bordered
      :scroll="{ x: 1600 }"
      :loading="tableLoading"
      :columns="blogColumns"
      :dataSource="blogList"
      :pagination="false"
      :rowKey="record => record.id"
    >
      <template #blogBrief="text">
        <p v-if="text.length < 50">{{text}}</p>
        <a-tooltip v-else>
          <template #title>{{text}}</template>
          <p>{{text.slice(0, 50)}}...</p>
        </a-tooltip>
      </template>
      <template #blogStatus="text">
        <a-badge v-if="+text === blogStatusMap.normal" status="success" text="正常" />
        <a-badge v-if="+text === blogStatusMap.hide" status="warning" text="已下架" />
        <a-badge v-if="+text === blogStatusMap.deleted" status="default" text="已删除" />
      </template>
      <template #blogTags="tags">
        <a-tag v-for="tag in tags" :key="tag.tagId" :color="tag.color">{{tag.tagName}}</a-tag>
      </template>
      <template #operation="text, record">
        <div class="operation-btn">
          <a-button type="primary" @click="toEditBlog(record)">编辑</a-button>
          <a-button v-if="record.status === blogStatusMap.hide" type="primary" @click="showBlog(record)">上架</a-button>
          <a-button v-if="record.status === blogStatusMap.normal" @click="hideBLog(record)">下架</a-button>
          <a-button v-if="record.status !== blogStatusMap.deleted" @click="deleteBlog(record)">删除</a-button>
        </div>
      </template>
    </a-table>
    <div class="page-box">
      <a-pagination
        showSizeChanger
        hideOnSinglePage
        showQuickJumper
        :page="pageData.page"
        :pageSize="pageData.pageSize"
        :total="pageData.total"
        :pageSizeOptions="['10', '20', '50']"
        @change="paginationChange"
        @showSizeChange="paginationChange"
      />
    </div>
  </div>
</template>

<script>
import { blogColumns } from '@/columns/blogColumns'

import { getUserListApi } from '@/mockData/user'
import { getCategoryListApi } from '@/mockData/category'
import { getBlogListApi, hideBlogApi, showBlogApi, deleteBlogApi } from '@/mockData/blog'

import { blogStatus, blogStatusMap } from '@/config/status'
export default {
  name: 'blog',
  data () {
    return {
      blogStatusMap,
      blogStatus: [{ label: '全部', value: -1 }, ...blogStatus ],
      blogColumns,
      tableLoading: false,
      reqData: {
        title: '',
        categoryId: -1,
        authId: -1,
        status: -1,
        startTime: '',
        endTime: ''
      },
      pageData: {
        page: 1,
        pageSize: 10,
        total: 100
      },
      categoryList: [],
      userList: [],
      blogList: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    /**
     * @function 初始化获取数据
     */
    initData () {
      this.tableLoading = true
      Promise.all([
        getUserListApi(),
        getCategoryListApi(),
        getBlogListApi(Object.assign({}, this.reqData, this.pageData))
      ]).then(([user, category, blog]) => {
        console.log(user, category, blog)
        this.userList = user.list
        this.categoryList = category.list
        this.blogList = blog.list
        this.pageData.total = blog.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @function 根据查询条件查询博客
     */
    queryBlog () {
      if (this.tableLoading) return
      this.tableLoading = true
      getBlogListApi(Object.assign({}, this.reqData, this.pageData)).then(res => {
        this.pageData.total = res.total
        this.blogList = res.list
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @function 重置查询条件
     */
    resetQuery () {
      this.reqData = {
        title: '',
        categoryId: -1,
        authId: -1,
        status: -1,
        startTime: '',
        endTime: ''
      }
      this.queryBlog()
    },
    /**
     * @function 前往编辑博客页面
     */
    toEditBlog (record) {
      console.log('edit', record)
      this.$router.push({ name: 'detail', query: { id: record.id }})
    },
    addNewBlog () {
      this.$router.push({ name: 'detail' })
    },
    /**
     * @function 下架博客
     */
    hideBLog (record) {
      console.log('hide', record)
      let that = this
      this.$confirm({
        title: '提示',
        content: '是否确认下架当前博客',
        onOk () {
          console.log('confirm hide blog')
          hideBlogApi(record.id).then(() => {
            that.$message.success({ content: '操作成功' })
            that.queryBlog()
          })
        }
      })
    },
    /**
     * @function 上架博客
     */
    showBlog (record) {
      console.log('show', record)
      let that = this
      this.$confirm({
        title: '提示',
        content: '是否确认上架当前博客',
        onOk () {
          console.log('confirm hide blog')
          showBlogApi(record.id).then(() => {
            that.$message.success({ content: '操作成功' })
            that.queryBlog()
          })
        }
      })
    },
    /**
     * @function 删除博客
     */
    deleteBlog (record) {
      console.log('delete', record)
      let that = this
      this.$confirm({
        title: '提示',
        content: '是否确认删除当前博客',
        onOk () {
          console.log('confirm hide blog')
          deleteBlogApi(record.id).then(() => {
            that.$message.success({ content: '操作成功' })
            that.queryBlog()
          })
        }
      })
    },
    /**
     * @function 分页器野马改变
     * @param {Object} pageData 改变之后的分页参数
     */
    paginationChange (...pageData) {
      Object.assign(this.pageData, pageData)
      this.queryBlog()
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
