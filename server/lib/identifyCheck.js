import errCode from '../config/errorCode'
import identifyMap from '../config/identify'

export default (identify) => (ctx, next) => {
  if (ctx.state.user.data.identify !== identifyMap.ADMIN) {
    ctx.body = {
      success: false,
      errorCode: errCode.IDENTIFY_ERROR,
      message: '无此操作权限'
    }
    return
  } else {
    return next()
  }
}
