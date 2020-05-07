import Tag from '../services/tag'
import errCode from '../config/errorCode'

export default class tag {
  static async createTag (ctx) {
    let { id, tag, color } = ctx.request.body
    if (!tag || !color) {
      ctx.body = {
        success: false,
        errorCode: errCode.PARAM_EMPTY,
        message: '标签参数错误'
      }
      return
    }
    if (await Tag.getOne(tag)) {
      ctx.body = {
        success: false,
        errorCode: errCode.TAG_EXISTS,
        message: '标签已存在'
      }
      return
    }
    try {
      if (id) {
        await Tag.updateTag(id, tag, color)
        ctx.body = {
          success: true,
          data: {
            msg: '标签更新成功'
          }
        }
        return
      }
      await Tag.createTag(tag, color)
      ctx.body = {
        success: true,
        data: {
          msg: '标签创建成功'
        }
      }
      return
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络错误，请重试'
      }
      return
    }
  }
  static async getTagList (ctx) {
    let { name, status } = ctx.request.body
    try {
      console.log(999, name, status)
      let data = await Tag.getTagList(name, status)
      ctx.body = {
        success: true,
        data: {
          count: data.count,
          list: data.rows
        }
      }
      return
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络错误，请重试'
      }
      return
    }
  }
  static async showTag (ctx) {
    let { id } = ctx.request.body
    try {
      await Tag.hideTag(id)
      ctx.body = {
        success: true,
        data: {
          msg: '标签下架成功'
        }
      }
      return
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络错误，请重试'
      }
      return
    }
  }
  static async hideTag (ctx) {
    let { id } = ctx.request.body
    try {
      await Tag.hideTag(id)
      ctx.body = {
        success: true,
        data: {
          msg: '标签下架成功'
        }
      }
      return
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络错误，请重试'
      }
      return
    }
  }
  static async deleteTag (ctx) {
    let { id } = ctx.request.body
    try {
      await Tag.deleteTag(id)
      ctx.body = {
        success: true,
        data: {
          msg: '标签删除成功'
        }
      }
      return
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络错误，请重试'
      }
      return
    }
  }
}