<template>
  <div class="category">
    <div class="filter-box">
      <div class="filter-item">
        <label>分类名称：</label>
        <a-input style="width: 160px" placeholder="请输入分类名" v-model="reqData.name" />
      </div>
      <div class="filter-item">
        <label>分类状态：</label>
        <a-select style="width: 120px" v-model="reqData.status" >
          <a-select-option :value="-1">全部</a-select-option>
          <a-select-option v-for="status in categoryStatus" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <a-button type="primary" :loading="tableLoading" @click="queryCategory">查询</a-button>
        <a-button style="margin-left: 20px;" @click="resetQuery">重置</a-button>
        <a-button style="margin-left: 20px;" @click="addNewCategory">新增分类</a-button>
      </div>
    </div>
    <a-table
      bordered
      :scroll="{ y: 860 }"
      :loading="tableLoading"
      :columns="categoryColumns"
      :dataSource="categoryList"
      :pagination="false"
      :rowKey="record => record.id"
    >
      <template #categoryStatus="text">
        <a-badge v-if="+text === categoryStatusMap.normal" status="success" text="正常" />
        <a-badge v-if="+text === categoryStatusMap.hide" status="warning" text="已下架" />
        <a-badge v-if="+text === categoryStatusMap.deleted" status="default" text="已删除" />
      </template>
      <template #operation="text, record">
        <div class="operation-btn">
          <a-button type="primary" @click="toEditCategory(record)">编辑</a-button>
          <a-button v-if="record.status === categoryStatusMap.hide" type="primary" @click="showCategory(record)">上架</a-button>
          <a-button v-if="record.status === categoryStatusMap.normal" @click="hideCategory(record)">下架</a-button>
          <a-button v-if="record.status !== categoryStatusMap.deleted" @click="deleteCategory(record)">删除</a-button>
        </div>
      </template>
    </a-table>
    <a-modal :visible="showAddModal" @ok="confirmAddCategory" @cancel="() => showAddModal = false">
      <label>分类名称：</label>
      <a-input style="width: 120px;" placeholder="分类名" v-model="newCategory" />
    </a-modal>
  </div>
</template>

<script>
import { categoryStatus, categoryStatusMap } from '@/config/status'
import { categoryColumns } from '@/columns/categoryColumns'

import { getCategoryListApi, addCategoryApi, showCategoryApi, hideCategoryApi, deleteCategoryApi } from '@/mockData/category'
export default {
  name: 'category',
  data () {
    return {
      categoryStatusMap,
      categoryStatus,
      categoryColumns,
      tableLoading: false,
      showAddModal: false,
      reqData: {
        name: '',
        status: -1
      },
      updateId: '',
      newCategory: '',
      categoryList: []
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      if (this.tableLoading) return
      this.tableLoading = true
      getCategoryListApi(this.reqData).then(res => {
        console.log(res.list)
        this.categoryList = res.list
      }).finally(() => {
        this.tableLoading = false
      })
    },
    toEditCategory (category) {
      this.newCategory = category.category
      this.showAddModal = true
      this.updateId = category.id
    },
    queryCategory () {
      this.getCategoryList()
    },
    resetQuery () {
      this.reqData = {
        name: '',
        status: -1
      }
      this.getCategoryList()
    },
    addNewCategory () {
      this.newCategory = ''
      this.updateId = ''
      this.showAddModal = true
    },
    confirmAddCategory () {
      addCategoryApi({ id: this.updateId, category: this.newCategory }).then(() => {
        this.$message.success({ content: '新增成功' })
        this.showAddModal = false
      })
    },
    showCategory (category) {
      let that = this
      this.$confirm({
        content: '确认上架此分类吗？',
        onOk () {
          showCategoryApi({ id: category.id }).then(() => {
            that.$message.success({ content: '操作成功' })
            that.getCategoryList()
          })
        }
      })
      
    },
    hideCategory (category) {
      let that = this
      this.$confirm({
        content: '确认下架此分类吗？',
        onOk () {
          hideCategoryApi({ id: category.id }).then(() => {
            that.$message.success({ content: '操作成功' })
            that.getCategoryList()
          })
        }
      })
    },
    deleteCategory (category) {
      let that = this
      this.$confirm({
        content: '确认删除此分类',
        onOK () {
          deleteCategoryApi({ id: category.id }).then(() => {
            that.$message.success({ content: '操作成功' })
            that.getCategoryList()
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
