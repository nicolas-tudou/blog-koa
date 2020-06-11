import Comment from '../services/comment'
import errCode from '../config/errorCode'
import  { dealComment } from '../lib/untils'

export default class categoryController {
  static async createComment(ctx) {
    let { blogId, parent, userName, userAvatar, comment } = ctx.request.body
    if (!blogId || !userName || !userAvatar || !comment) {
      ctx.body = {
        success: false,
        errorCode: errCode.PARAM_EMPTY,
        message: '参数不能为空'
      }
      return
    }
    try {
      await Comment.createComment(blogId, parent, userName, userAvatar, comment)
      ctx.body = {
        success: true,
        data: {
          msg: '评论发表成功'
        }
      }
      return
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请稍后重试'
      }
      return
    }
  }
  static async getCommentList (ctx) {
    let { id } = ctx.request.body
    if (!id) {
      ctx.body = {
        success: false,
        errorCode: errCode.PARAM_EMPTY,
        message: 'id不能为空'
      }
      return
    }
    try {
      let list = await Comment.getCommentList(id)
      list = dealComment(list)
      ctx.body = {
        success: true,
        data: {
          list
        }
      }
      return
    } catch (err) {
      ctx.body = {
        success: false,
        errorCode: errCode.NETWORK_ERROR,
        message: '网络繁忙，请稍后重试'
      }
      return
    }
  }
}
