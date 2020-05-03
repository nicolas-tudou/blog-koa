import category from '../controller/category'
import tag from '../controller/tag'
import jwt from '../lib/jwt'

export default router => {
  router.post('/api/category/add', jwt, category.createCategory)
  router.post('/api/category/query/list', category.getCategoryList)
  router.post('/api/category/set/show', jwt, category.showCategory)
  router.post('/api/category/set/hide', jwt, category.hideCategory)
  router.post('/api/category/set/delete', jwt, category.deleteCategory)

  router.post('api/tag/add', jwt, tag.createTag)
  router.post('api/tag/query/list', tag.getTagList)
  router.post('api/tag/show', jwt, tag.showTag)
  router.post('api/tag/hide', jwt, tag.hideTag)
  router.post('api/tag/delete', jwt, tag.deleteTag)
}
