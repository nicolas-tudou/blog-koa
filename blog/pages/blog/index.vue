<template>
  <div class="blog">
    <category-list :categoryList="categoryList" :selectIndex="categoryIndex" @change="categoryChange" />
    <div class="blog-box" @scroll="blogListScroll">
      <blog-item
        v-for="blog in blogList"
        :key="blog.id"
        :blog="blog"/>
      <empty-content v-if="!blogList.length" />
    </div>
  </div>
</template>

<script>
import CategoryList from '@/components/categoryList'
import BlogItem from '@/components/blogItem'
import EmptyContent from '@/components/emptyContent'
export default {
  name: 'blog',
  components: {
    CategoryList,
    BlogItem,
    EmptyContent
  },
  data () {
    return {
      categoryIndex: 0,
      loadAll: false,
      formData: {},
      categoryList: [],
      blogList: []
    }
  },
  asyncData ({ $axios }) {
    let data = {
      categoryList: [],
      blogList: [],
      formData: {
        categoryId: '',
        title: '',
        page: 1,
        pageSize: 10
      }
    }
    return new Promise(resolve => {
      $axios.$post('/api/category/query/list').then(res => {
        data.categoryList = res.list
        data.formData.categoryId = res.list[0].id
        $axios.$post('/api/blog/query/list', data.formData).then(res => {
          data.blogList = res.list
          data.formData.page++
          data.loadAll = res.list.length < data.formData.pageSize
          resolve(data)
        })
      })
    })
  },
  methods: {
    /**
     * @function 获取博客列表
     */
    getList () {
      if (this.loadAll || this.loading) return
      this.loading = true
      this.$axios.$post('/api/blog/query/list', this.formData).then(res => {
        if (res.list.length < this.formData.pageSize) {
          this.loadAll = true
        } else {
          this.formData.page ++
        }
        this.blogList.push(...res.list)
      }).finally(res => {
        this.loading = false
      })
    },
    /**
     * @function 滚动事件加载列表
     * @param {Object} e 滚动事件对象
     */
    blogListScroll (e) {
      let { offsetHeight, scrollTop, scrollHeight } = e.target
      let deltH = scrollHeight - scrollTop - offsetHeight
      if (deltH < 100 && !this.loadAll && !this.loading) {
        this.getList()
      }
    },
    /**
     * @function 选中分类改变
     * @param {index} index 选中的分类索引
     * @param {Object} category 选中的分类信息
     */
    categoryChange (index, category) {
      console.log(index, category)
      if (this.loading) return
      this.loadAll = false
      Object.assign(this.formData, {
        categoryId: category.id,
        page: 1,
      })
      this.categoryIndex = index
      this.blogList = []
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
