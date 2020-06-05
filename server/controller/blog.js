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
    } = ctx.request.body
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
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请重试'
      }
      return
    }
  }
  static async getBlogList(ctx) {
    let { title, categoryId, authId, status, page, pageSize } = ctx.request.body
    console.log('====>', categoryId)
    try {
      let blogData = await blogService.getBlogList(title, categoryId, authId, status, page, pageSize)
      let list = []
      blogData.rows.forEach(blog => {
        blog = blog.toJSON()
        let { t_category, t_user, t_comments, t_tags, ...data } = blog
        let tags = []
        t_tags.forEach(tag => {
          tags.push({
            tagId: tag.tagId,
            tagName: tag.tag,
            color: tag.color
          })
        })
        list.push({
          ...data,
          ...t_category,
          ...t_user,
          commentNum: t_comments.length,
          tags: tags
        })
      })
      ctx.body = {
        success: true,
        data: {
          count: blogData.count,
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
      let { t_user, t_tags, t_category, ...blogInfo } = (await blogService.getBlogDetail(id)).toJSON()
      let tags = []
      t_tags.forEach(tag => {
        tags.push(tag.tagId)
      })
      let data = {
        ...blogInfo,
        ...t_user,
        ...t_category,
        tags
      }
      ctx.body = {
        success: true,
        data
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
