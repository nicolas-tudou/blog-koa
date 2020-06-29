import Post from '@/plugins/http'
// getBlogListApi, hideBlogApi, showBlogApi, deleteBlogApi
export const getBlogListApi = (data) => {
  return Post('/blog/query/list', data)
}

export const getBlogDetailApi = (data) => {
  return Post('/blog/query/detail', data)
}

export const addNewBlogApi = (data) => {
  return Post('/blog/set/add', data)
}

export const updateBlogApi = (data) => {
  return Post('/blog/set/update', data)
}

export const showBlogApi = (data) => {
  return Post('/blog/set/show', data)
}

export const hideBlogApi = (data) => {
  return Post('/blog/set/hide', data)
}

export const deleteBlogApi = (data) => {
  return Post('/blog/set/delete', data)
}

export const likeBlogApi = (data) => {
  return Post('/blog/set/like', data)
}

export const ddislikeBlogApi = (data) => {
  return Post('/blog/set/dislike', data)
}

export const uploadImageAPi = data => {
  return Post('/common/upload/image', data)
}
