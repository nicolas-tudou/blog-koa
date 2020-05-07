<template>
  <div class="user">
    <div class="filter-box">
      <div class="filter-item">
        <label>用户名称：</label>
        <a-input style="width: 160px;" placeholder="请输入用户名" v-model="reqData.name" />
      </div>
      <div class="filter-item">
        <label>用户角色：</label>
        <a-select style="width: 120px;" v-model="reqData.identify" >
          <a-select-option :value="-1">全部</a-select-option>
          <a-select-option v-for="status in identifyOptions" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <label>用户状态：</label>
        <a-select style="width: 120px;" v-model="reqData.status" >
          <a-select-option :value="-1">全部</a-select-option>
          <a-select-option v-for="status in userStatus" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
        </a-select>
      </div>
      <div class="filter-item">
        <a-button type="primary" :loading="tableLoading" @click="queryUser">查询</a-button>
        <a-button style="margin-left: 20px;" @click="resetQuery">重置</a-button>
        <!-- <a-button style="margin-left: 20px;" @click="addNewUser">新增用户</a-button> -->
      </div>
    </div>
    <a-table
      bordered
      :scroll="{ y: 860 }"
      :loading="tableLoading"
      :columns="userColumns"
      :dataSource="userList"
      :pagination="false"
      :rowKey="record => record.id"
    >
      <template #userIdentify="text">
        <a-badge v-if="+text === identifyMap.admin" status="success" text="超级管理员" />
        <a-badge v-if="+text === identifyMap.manage" status="processing" text="管理员" />
        <a-badge v-if="+text === identifyMap.normal" status="error" text="游客" />
      </template>
      <template #userStatus="text">
        <a-badge v-if="+text === userStatusMap.normal" status="success" text="正常" />
        <a-badge v-if="+text === userStatusMap.lock" status="processing" text="锁定" />
        <a-badge v-if="+text === userStatusMap.deleted" status="default" text="已删除" />
      </template>
      <template #operation="text, record">
        <div class="operation-btn">
          <!-- <a-button type="primary" @click="toEditUser(record)">编辑</a-button> -->
          <a-button v-if="record.status !== userStatusMap.normal" type="primary" @click="unLockUser(record)">恢复</a-button>
          <a-button v-if="record.status === userStatusMap.normal" type="primary" @click="lockUser(record)">锁定</a-button>
          <a-button v-if="record.status !== userStatusMap.deleted" @click="deleteUser(record)">删除</a-button>
        </div>
      </template>
    </a-table>
    <a-modal :visible="showAddModal" @ok="confirmAddUser" @cancel="() => showAddModal = false">
      <label>用户名称：</label>
      <a-input style="width: 120px; margin-bottom: 10px;" placeholder="用户名" v-model="newUser.name" />
      <div class="filter-item">
        <label>用户角色：</label>
        <a-select style="width: 120px;" v-model="newUser.identify" >
          <a-select-option v-for="status in identifyOptions" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
        </a-select>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { userStatusMap, userStatus, identifyOptions, identifyMap } from '@/config/status'
import { userColumns } from '@/columns/userColumns'

// import { getUserListApi, addUserApi, deleteUserApi, lockUserApi, unLockUserApi } from '@/mockData/user'
import { getUserListApi, addUserApi, deleteUserApi, lockUserApi, unLockUserApi } from '@/api/userApi'
export default {
  name: 'user',
  data () {
    return {
      userStatusMap,
      userStatus,
      identifyOptions,
      identifyMap,
      userColumns,
      tableLoading: false,
      showAddModal: false,
      reqData: {
        name: '',
        status: -1,
        identify: -1
      },
      updateId: '',
      newUser: {
        id: '',
        name: '',
        identify: 3
      },
      userList: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      if (this.tableLoading) return
      this.tableLoading = true
      getUserListApi(this.reqData).then(res => {
        console.log(res.list)
        this.userList = res.list
      }).finally(() => {
        this.tableLoading = false
      })
    },
    toEditUser (user) {
      this.newUser = {
        id: user.id,
        name: user.name,
        identify: user.identify
      }
      this.showAddModal = true
    },
    queryUser () {
      this.getUserList()
    },
    resetQuery () {
      this.reqData = {
        name: '',
        status: -1,
        identify: -1
      }
      this.getUserList()
    },
    addNewUser () {
      this.newUser = {
        id: '',
        name: '',
        identify: 3
      }
      this.showAddModal = true
    },
    confirmAddUser () {
      if (!this.newUser.name || !this.newUser.identify) {
        this.$message.error({ content: '请补充完整信息' })
        return
      }
      addUserApi(this.newUser).then(() => {
        this.$message.success({ content: '新增成功' })
        this.showAddModal = false
      })
    },
    lockUser (user) {
      let that = this
      this.$confirm({
        content: '确认上架此用户吗？',
        onOk () {
          lockUserApi({ id: user.id }).then(() => {
            that.$message.success({ content: '操作成功' })
            that.getUserList()
          })
        }
      })
      
    },
    unLockUser (user) {
      let that = this
      this.$confirm({
        content: '确认下架此用户吗？',
        onOk () {
          unLockUserApi({ id: user.id }).then(() => {
            that.$message.success({ content: '操作成功' })
            that.getUserList()
          })
        }
      })
    },
    deleteUser (user) {
      let that = this
      this.$confirm({
        content: '确认删除此用户',
        onOk () {
          deleteUserApi({ id: user.id }).then(() => {
            that.$message.success({ content: '操作成功' })
            that.getUserList()
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
