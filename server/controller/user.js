import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { secret } from '../config'
import errCode from '../config/errorCode'
import UserServer from '../services/user'

export default class user {
  static async signUp(ctx) {
    let { name, password } = ctx.request.body
    let user =await UserServer.getOne(name)
    console.log(333, ctx.request.body.password, name, password)
    try {
      if (user) {
        ctx.body = {
          success: false,
          errorCode: errCode.USER_EXISTS,
          message: '用户名已存在'
        }
        return
      }
      console.log(333, ctx.request.body.password, name, password)
      password = await bcrypt.hash(password, 5)
      console.log('password:', password)
      let defaultAvatar = 'http://todo-fordream.club/img/sign.1315dff6.jpg'
      await UserServer.create(name, password, defaultAvatar)
      let userInfo = await UserServer.getOne(name)
      let userData = {
        id: userInfo.id,
        name: userInfo.name,
        avatar: userInfo.avatar,
        identify: userInfo.identify,
        status: userInfo.status,
        createTime: userInfo.createTime,
        updateTime: userInfo.updateTime
      }
      ctx.body = {
        success: true,
        data: {
          ...userData,
          token: jsonwebtoken.sign({
            data: userData,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
          }, secret)
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
    }
  }
  static async signIn(ctx) {
    console.log(333, ctx)
    let { name, password } = ctx.request.body
    let user = await UserServer.getOne(name)
    if (!user) {
      ctx.body = {
        success: false,
        message: '用户名错误'
      }
      return
    }
    if (await bcrypt.compare(password, user.password)) {
      let userInfo = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        identify: user.identify,
        status: user.status,
        createTime: user.createTime,
        updateTime: user.updateTime
      }
      ctx.body = {
        success: true,
        message: '登陆成功',
        data: {
          ...userInfo,
          token: jsonwebtoken.sign({
            data: userInfo,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
          }, secret)
        }
      }
    } else {
      ctx.body = {
        success: false,
        errorCode: errCode.LOGIN_INFO_ERROR,
        message: '密码错误，请重新输入'
      }
    }
  }
  static async getUserList(ctx) {
    let { name, identify, status} = ctx.request.body
    try {
      let userData = await UserServer.getUserList(name, identify, status)
      let list = []
      userData.rows.forEach(user => {
        let { t_blogs, ...userInfo} = user.toJSON()
        list.push({
          ...userInfo,
          blogNum: t_blogs.length
        })
      })
      ctx.body = {
        success: true,
        data: {
          count: userData.count,
          list: list
        }
      }
    } catch(err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络错误，请重试'
      }
    }
  }
  static async addUser(ctx) {
    let { id, name, identify } = ctx.request.body
    let user = await UserServer.getOne(name)
    if (!id && user) {
      ctx.body = {
        success: false,
        errorCode: errCode.USER_EXISTS,
        message: '用户名已存在'
      }
      return
    }
    if (!id) {
      await UserServer.create(name, identify)
    }
  }
  static async deleteUser(ctx) {
    let userInfo = ctx.state.user.data
    let { id } = ctx.request.body
    try {
      await UserServer.setUserStatus(id, 3)
      ctx.body = {
        success: true,
        data: {
          msg: '删除成功'
        }
      }
    } catch (err) {
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
    }
  }
  static async lockUser(ctx) {
    let { id } = ctx.request.body
    try {
      await UserServer.setUserStatus(id, 2)
      ctx.body = {
        success: true,
        data: {
          msg: '用户锁定成功'
        }
      }
    } catch (err) {
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
    }
  }
  static async unlockUser(ctx) {
    let { id } = ctx.request.body
    try {
      await UserServer.setUserStatus(id, 1)
      ctx.body = {
        success: true,
        data: {
          msg: '解锁成功'
        }
      }
    } catch (err) {
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
    }
  }
}
