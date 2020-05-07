import Post from '@/plugins/http'
// getBlogListApi, hideBlogApi, showBlogApi, deleteBlogApi
export const getBlogListApi = (data) => {
  return Post('/blog/query/list', data)
}

export const hideBlogApi = (data) => {
  return Post('/blog/set/hide', data)
}

export const showBlogApi = (data) => {
  return Post('/blog/set/show', data)
}

export const deleteBlogApi = (data) => {
  return Post('/blog/set/delete', data)
}
