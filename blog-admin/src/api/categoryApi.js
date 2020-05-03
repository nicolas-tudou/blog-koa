import Post from '@/plugins/http'

export const addCategoryApi = (data) => {
  return Post('/category/add', data)
}

export const getCategoryListApi = (data) => {
  return Post('/category/query/list', data)
}

export const showCategoryApi = (data) => {
  return Post('/category/set/show', data)
}

export const hideCategoryApi = (data) => {
  return Post('/category/set/hide', data)
}

export const deleteCategoryApi = (data) => {
  return Post('/category/set/delete', data)
}
