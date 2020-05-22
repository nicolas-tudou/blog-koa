import Post from '@/plugins/http'

// category
export const getCategoryListApi = (data) => {
  return Post('/api/category/query/list', data)
}

// blog
export const getBlogListApi = (data) => {
  return Post('/api/blog/query/list', data)
}

export const getBlogDetailApi = (data) => {
  return Post('/api/blog/query/detail', data)
}

export const likeBlogApi = (data) => {
  return Post('/api/blog/set/like', data)
}

export const dislikeBlogApi = (data) => {
  return Post('/api/blog/set/dislike', data)
}
