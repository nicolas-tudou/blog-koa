<template>
  <div class="tag">
    <div class="filter-box">
      <div class="filter-item">
        <label>标签名称：</label>
        <a-input style="width: 160px;" placeholder="请输入标签名" v-model="reqData.name" />
      </div>
      <div class="filter-item">
        <label>标签状态：</label>
        <a-select style="width: 120px;" v-model="reqData.status" >
          <a-select-option :value="-1">全部</a-select-option>
          <a-select-option v-for="status in tagStatus" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <a-button type="primary" :loading="tableLoading" @click="queryTag">查询</a-button>
        <a-button style="margin-left: 20px;" @click="resetQuery">重置</a-button>
        <a-button style="margin-left: 20px;" @click="addNewTag">新增标签</a-button>
      </div>
    </div>
    <a-table
      bordered
      :scroll="{ y: 860 }"
      :loading="tableLoading"
      :columns="tagColumns"
      :dataSource="tagList"
      :pagination="false"
      :rowKey="record => record.id"
    >
      <template #tagStatus="text">
        <a-badge v-if="+text === tagStatusMap.normal" status="success" text="正常" />
        <a-badge v-if="+text === tagStatusMap.hide" status="warning" text="已下架" />
        <a-badge v-if="+text === tagStatusMap.deleted" status="default" text="已删除" />
      </template>
      <template #operation="text, record">
        <div class="operation-btn">
          <a-button type="primary" @click="toEditTag(record)">编辑</a-button>
          <a-button v-if="record.status === tagStatusMap.hide" type="primary" @click="showTag(record)">上架</a-button>
          <a-button v-if="record.status === tagStatusMap.normal" @click="hideTag(record)">下架</a-button>
          <a-button v-if="record.status !== tagStatusMap.deleted" @click="deleteTag(record)">删除</a-button>
        </div>
      </template>
    </a-table>
    <a-modal :visible="showAddModal" @ok="confirmAddTag" @cancel="() => showAddModal = false">
      <label>标签名称：</label>
      <a-input style="width: 120px;" placeholder="标签名" v-model="newTag" />
    </a-modal>
  </div>
</template>

<script>
import { tagStatus, tagStatusMap } from '@/config/status'
import { tagColumns } from '@/columns/tagColumns'

import { getTagListApi, addTagApi, showTagApi, hideTagApi, deleteTagApi } from '@/mockData/tag'
export default {
  name: 'tag',
  data () {
    return {
      tagStatusMap,
      tagStatus,
      tagColumns,
      tableLoading: false,
      showAddModal: false,
      reqData: {
        name: '',
        status: -1
      },
      updateId: '',
      newTag: '',
      tagList: []
    }
  },
  created () {
    this.getTagList()
  },
  methods: {
    getTagList () {
      if (this.tableLoading) return
      this.tableLoading = true
      getTagListApi(this.reqData).then(res => {
        console.log(res.list)
        this.tagList = res.list
      }).finally(() => {
        this.tableLoading = false
      })
    },
    toEditTag (tag) {
      this.newTag = tag.tagName
      this.showAddModal = true
      this.updateId = tag.id
    },
    queryTag () {
      this.getTagList()
    },
    resetQuery () {
      this.reqData = {
        name: '',
        status: -1
      }
      this.getTagList()
    },
    addNewTag () {
      this.newTag = ''
      this.updateId = ''
      this.showAddModal = true
    },
    confirmAddTag () {
      addTagApi({ id: this.updateId, tag: this.newTag }).then(() => {
        this.$message.success({ content: '新增成功' })
        this.showAddModal = false
      })
    },
    showTag (tag) {
      let that = this
      this.$confirm({
        content: '确认上架此标签吗？',
        onOk () {
          showTagApi({ id: tag.id }).then(() => {
            that.$message.success({ content: '操作成功' })
            that.getTagList()
          })
        }
      })
      
    },
    hideTag (tag) {
      let that = this
      this.$confirm({
        content: '确认下架此标签吗？',
        onOk () {
          hideTagApi({ id: tag.id }).then(() => {
            that.$message.success({ content: '操作成功' })
            that.getTagList()
          })
        }
      })
    },
    deleteTag (tag) {
      let that = this
      this.$confirm({
        content: '确认删除此标签',
        onOK () {
          deleteTagApi({ id: tag.id }).then(() => {
            that.$message.success({ content: '操作成功' })
            that.getTagList()
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
