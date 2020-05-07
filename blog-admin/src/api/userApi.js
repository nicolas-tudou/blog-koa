import Post from '@/plugins/http'

export const signUpApi = (data) => {
  return Post('/admin/signUp', data)
}

export const loginApi = (data) => {
  return Post('/admin/signIn', data)
}

// getUserListApi, addUserApi, deleteUserApi, lockUserApi, unLockUserApi
export const getUserListApi = (data) => {
  return Post('/admin/user/query/list', data)
}

export const addUserApi = (data) => {
  return Post('/admin/user/set/add', data)
}

export const deleteUserApi = (data) => {
  return Post('/admin/user/set/delete', data)
}

export const lockUserApi = (data) => {
  return Post('/admin/user/set/lock', data)
}

export const unLockUserApi = (data) => {
  return Post('/admin/user/set/unlock', data)
}