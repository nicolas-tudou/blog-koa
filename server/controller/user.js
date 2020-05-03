import userService from '../services/user'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { secret } from '../config'
import errCode from '../config/errorCode'

export default class user {
  static async signUp(ctx) {
    const { body } = ctx.request
    let name = body.name
    let password = body.password
    let user =await userService.getOne(name)
    try {
      if (user) {
        ctx.body = {
          success: false,
          data: {
            msg: '用户名已存在'
          }
        }
        return
      }
      password = await bcrypt.hash(password, 5)
      console.log('password:', password)
      let defaultAvatar = 'http://todo-fordream.club/img/sign.1315dff6.jpg'
      await userService.create(name, password, defaultAvatar)
      let {
        password,
        ...userInfo
      } = await userService.getOne(name)
      ctx.body = {
        success: true,
        data: {
          ...userInfo,
          token: jsonwebtoken.sign({
            data: userInfo,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
          }, secret)
        }
      }
    } catch (ex) {
      ctx.throw(500)
    }
  }
  static async signIn(ctx) {
    console.log(333, ctx)
    let { name, password } = ctx.request.body
    let user = await userService.getOne(name)
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
}
