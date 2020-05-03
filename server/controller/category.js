import Category from '../services/category'
import errCode from '../config/errorCode'

export default class categoryController {
  static async createCategory(ctx) {
    let { id, category } = ctx.request.body
    if (!category) {
      ctx.body = {
        success: false,
        errorCode: errCode.PARAM_EMPTY,
        message: '分类名称不能为空'
      }
      return
    }
    if (await Category.getOne(category)) {
      ctx.body = {
        success: false,
        errorCode: errCode.CATEGORY_EXISTS,
        message: '该分类已存在'
      }
      return
    }
    try {
      if (id) {
        try {
          await Category.updateCategory(id, category)
          ctx.body = {
            success: true,
            data: {
              msg: '分类修改成功'
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
        return
      }
      await Category.createCategory(category)
      ctx.body = {
        success: true,
        data: {
          msg: '分类创建成功'
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
  static async getCategoryList(ctx) {
    let { name, status } = ctx.request.body
    if (status < -1 || status === 0 || status > 3) {
      ctx.body = {
        success: false,
        errorCode: errCode.PARAM_ERROR,
        message: '分类状态值错误'
      }
      return
    }
    try {
      let { count, rows} = await Category.getCategoryList(name, status)
      ctx.body = {
        success: true,
        data: {
          count,
          list: rows
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
  static async hideCategory(ctx) {
    let { id } = ctx.request.body
    try {
      await Category.hideCategory(id)
      ctx.body = {
        success: true,
        data: {
          msg: '分类下架成功'
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
  static async showCategory(ctx) {
    let { id } = ctx.request.body
    try {
      await Category.showCategory(id)
      ctx.body = {
        success: true,
        data: {
          msg: '分类上架成功'
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
  static async deleteCategory(ctx) {
    let { id } = ctx.request.body
    try {
      await Category.deleteCategory(id)
      ctx.body = {
        success: true,
        data: {
          msg: '分类删除成功'
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
