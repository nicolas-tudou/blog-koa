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
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async updateBlog(ctx) {
    let {
      id,
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
      let blog = await blogService.updateBlog(id, title, logo, authId, categoryId, tags, detail)
      console.log(blog)
      ctx.body = {
        success: true,
        data: {
          msg: '更新博客成功'
        }
      }
      return
    } catch (err) {
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async getBlogList(ctx) {
    let { title, categoryId, authId, status } = ctx.request.body
    try {
      let list = await blogService.getBlogList(title, categoryId, authId, status)
      ctx.body = {
        success: true,
        data: {
          count: list.count,
          list: list.rows
        }
      }
      return
    } catch(err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async getBlogDetail(ctx) {
    let { id } = ctx.request.body
    try {
      let detail = await blogService.getBlogDetail(id)
      ctx.body = {
        success: true,
        data: {
          ...detail
        }
      }
      return
    } catch(err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async showBlog(ctx) {
    let { id } = ctx.request.body
    try {
      await blogService.updateBlogStatus(id, 1)
      ctx.body = {
        success: true,
        data: {
          msg: '博客删除成功'
        }
      }
      return
    } catch(err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async hideBlog(ctx) {
    let { id } = ctx.request.body
    try {
      await blogService.updateBlogStatus(id, 2)
      ctx.body = {
        success: true,
        data: {
          msg: '博客删除成功'
        }
      }
      return
    } catch(err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async deleteBlog(ctx) {
    let { id } = ctx.request.body
    try {
      await blogService.updateBlogStatus(id, 3)
      ctx.body = {
        success: true,
        data: {
          msg: '博客删除成功'
        }
      }
      return
    } catch(err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async likeBlog(ctx) {
    let { id, step } = ctx.request.body
    try {
      await blogService.likeBlog(id, step)
      ctx.body = {
        success: true,
        data: {
          msg: '操作成功'
        }
      }
      return
    } catch(err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async dislikeBlog(ctx) {
    let { id, step } = ctx.request.body
    try {
      await blogService.dislikeBlog(id, step)
      ctx.body = {
        success: true,
        data: {
          msg: '操作成功'
        }
      }
      return
    } catch(err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
}
