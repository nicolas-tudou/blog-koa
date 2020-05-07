import Post from '@/plugins/http'
// getTagListApi, addTagApi, showTagApi, hideTagApi, deleteTagApi
export const getTagListApi = (data) => {
  return Post('/tag/query/list', data)
}

export const addTagApi = (data) => {
  return Post('/tag/add', data)
}

export const showTagApi = (data) => {
  return Post('/tag/set/show', data)
}

export const hideTagApi = (data) => {
  return Post('/tag/set/hide', data)
}

export const deleteTagApi = (data) => {
  return Post('/tag/set/delete', data)
}
