import blogService from '../services/blog'
import errCode from '../config/errorCode'

export default class BLog {
  static async createNewBlog(ctx) {
    let { body } = ctx.request
    let {
      title,
      logo,
      categoryId,
      tags,
      detail,
      authId
    } = body
    if (!title || !logo || !categoryId || !tags.length || !authId || !detail) {
      ctx.body = {
        success: false,
        errorCode: errCode.BLOG_INFO_ERROR,
        message: '博客信息有误，请检查重新提交！'
      }
      return
    }
    try {
      let blog = await blogService.createBlog(title, logo, authId, categoryId, tags, detail)
      console.log(blog)
      ctx.body = {
        success: true,
        data: {
          msg: '添加博客成功'
        }
      }
      return
    } catch (err) {
      ctx.body = {
        success: false,
        errorCode: errorCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async updateBlog(ctx) {

  }
  static async getBlogList(ctx) {

  }
  static async getBlogInfo(ctx) {

  }
  static async showBlog(ctx) {

  }
  static async hideBlog(ctx) {

  }
  static async deleteBlog(ctx) {

  }
}
