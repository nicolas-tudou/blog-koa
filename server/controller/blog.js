import blogService from '../services/blog'
import TagBLogService from '../services/tagBlog'
import errCode from '../config/errorCode'

export default class BLog {
  static async createNewBlog(ctx) {
    let { body } = ctx.request
    let {
      title,
      logo,
      brief,
      categoryId,
      tags,
      detail,
      authId
    } = body
    console.log(title, logo, brief, categoryId, detail, authId)
    if (!title || !logo || !categoryId || !authId || !detail) {
      ctx.body = {
        success: false,
        errorCode: errCode.BLOG_INFO_ERROR,
        message: '博客信息有误，请检查重新提交！'
      }
      return
    }
    try {
      let blog = await blogService.createNewBlog(title, logo, brief, authId, categoryId, tags || [], detail)
      console.log(99, blog[null])
      let blogId = blog[null]
      if (tags || tags.length) {
        tags.forEach(async id => await TagBLogService.create(id, blogId))
      }
      ctx.body = {
        success: true,
        data: {
          msg: '添加博客成功'
        }
      }
      return
    } catch (err) {
      console.log(err)
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
      brief,
      categoryId,
      tags,
      detail,
      authId
    } = body
    if (!title || !logo || !brief || !categoryId || !authId || !detail) {
      ctx.body = {
        success: false,
        errorCode: errCode.BLOG_INFO_ERROR,
        message: '博客信息有误，请检查重新提交！'
      }
      return
    }
    try {
      let blog = await blogService.updateBlog(id, title, logo, brief, authId, categoryId, tags, detail)
      console.log(blog)
      await TagBLogService.clear(-1, id)
      if (tags && tags.length) {
        tags.forEach(async tagId => await TagBLogService.create(tagId, id)) 
      }
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
      let blogData = await blogService.getBlogList(title, categoryId, authId, status)
      let list = []
      blogData.rows.forEach(blog => {
        blog = blog.toJSON()
        let { t_category, t_user, ...data } = blog
        list.push({
          ...data,
          categoryId: t_category.id,
          categoryName: t_category.category,
          userId: t_user.id,
          authName: t_user.name
        })
      })
      ctx.body = {
        success: true,
        data: {
          count: list.length,
          list
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
