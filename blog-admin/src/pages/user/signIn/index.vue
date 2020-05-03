<template>
  <div class="sign-in">
    <div class="content-wrapper">
      <h2 class="title">博客后台管理系统</h2>
      <div class="content">
        <a-tabs>
          <a-tab-pane tab="登陆" key="signIn">
            <div class="content-box">
              <a-input
                v-model="user.name"
                :maxLength="9"
                allowClear
                placeholder="请输入用户名"
              >
                <a-icon slot="prefix" type="user" />
                <a-tooltip slot="suffix" title="最长9个字符">
                  <a-icon type="info-circle" style="color: rgba(0,0,0,.45);" />
                </a-tooltip>
              </a-input>
              <a-input
                class="margin-top"
                v-model="user.password"
                :maxLength="20"
                type="password"
                placeholder="请输入密码"
              >
                <a-icon slot="prefix" type="lock" />
                <a-tooltip slot="suffix" title="最长20个字符">
                  <a-icon type="info-circle" style="color: rgba(0,0,0,.45);" />
                </a-tooltip>
              </a-input>
              <a-checkbox v-model="rememberUser">记住用户名</a-checkbox>
              <a-button class="margin-top" type="primary" @click="signIn">登陆</a-button>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="注册" key="signUp">
            <div class="content-box">
              <a-input
                v-model="register.name"
                :maxLength="9"
                allowClear
                placeholder="请输入用户名"
              >
                <a-icon slot="prefix" type="user" />
                <a-tooltip slot="suffix" title="最长9个字符">
                  <a-icon type="info-circle" style="color: rgba(0,0,0,.45);" />
                </a-tooltip>
              </a-input>
              <a-input
                class="margin-top"
                v-model="register.password"
                :maxLength="20"
                type="password"
                placeholder="请输入密码"
              >
                <a-icon slot="prefix" type="user" />
                <a-tooltip slot="suffix" title="最长20个字符">
                  <a-icon type="info-circle" style="color: rgba(0,0,0,.45);" />
                </a-tooltip>
              </a-input>
              <a-button class="margin-top" type="primary" @click="signUp">注册</a-button>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { signUpApi, loginApi } from '@/api/userApi'
import { mapMutations } from 'vuex'

export default {
  name: 'signIn',
  data () {
    return {
      rememberUser: false,
      register: {
        name: '',
        password: ''
      },
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    signUp () {
      if (!this.register.name || !this.register.password) {
        this.$warning({ content: '账号名或密码错误' })
        return
      }
      signUpApi(this.register).then(res => {
        console.log('sign up', res)
        localStorage.setItem('user', JSON.stringify(res))
        localStorage.setItem('token', res.token)
        this.setUserInfo(res)
        this.$router.push({
          name: 'root'
        })
      })
    },
    signIn () {
      if (!this.user.name || !this.user.password) {
        this.$warning({ content: '账号名或密码错误' })
        return
      }
      loginApi(this.user).then(res => {
        console.log('login', res)
        localStorage.setItem('user', JSON.stringify(res))
        localStorage.setItem('token', res.token)
        this.setUserInfo(res)
        this.$router.push({
          name: 'root'
        })
      }).catch(err => {
        console.log(333, err)
      })
      // localStorage.setItem('user', JSON.stringify(this.user))
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
