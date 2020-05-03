import Post from '@/plugins/http'

export const signUpApi = (data) => {
  return Post('/admin/signUp', data)
}

export const loginApi = (data) => {
  return Post('/admin/signIn', data)
}
