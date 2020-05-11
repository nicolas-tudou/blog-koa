import category from '../controller/category'
import tag from '../controller/tag'
import blog from '../controller/blog'
import jwt from '../lib/jwt'
import identifyCheck from '../lib/identifyCheck'
import identify from '../config/identify'

export default router => {
  // category
  router.post('/api/category/add', jwt, identifyCheck(identify.ADMIN), category.createCategory)
  router.post('/api/category/query/list', category.getCategoryList)
  router.post('/api/category/set/show', jwt, identifyCheck(identify.ADMIN), category.showCategory)
  router.post('/api/category/set/hide', jwt, identifyCheck(identify.ADMIN), category.hideCategory)
  router.post('/api/category/set/delete', jwt, identifyCheck(identify.ADMIN), category.deleteCategory)

  // tag
  router.post('/api/tag/add', jwt, identifyCheck(identify.ADMIN), tag.createTag)
  router.post('/api/tag/query/list', identifyCheck(identify.ADMIN), tag.getTagList)
  router.post('/api/tag/set/show', jwt, identifyCheck(identify.ADMIN), tag.showTag)
  router.post('/api/tag/set/hide', jwt, identifyCheck(identify.ADMIN), tag.hideTag)
  router.post('/api/tag/set/delete', jwt, identifyCheck(identify.ADMIN), tag.deleteTag)

  // blog
  router.post('/api/blog/query/list', blog.getBlogList)
  router.post('/api/blog/query/detail', blog.getBlogDetail)
  router.post('/api/blog/set/add', jwt, identifyCheck(identify.MANAGE), blog.createNewBlog)
  router.post('/api/blog/set/update', jwt, identifyCheck(identify.MANAGE), blog.updateBlog)
  router.post('/api/blog/set/show', jwt, identifyCheck(identify.ADMIN), blog.showBlog)
  router.post('/api/blog/set/hide', jwt, identifyCheck(identify.ADMIN), blog.hideBlog)
  router.post('/api/blog/set/delete', jwt, identifyCheck(identify.ADMIN), blog.deleteBlog)
  router.post('/api/blog/set/like', blog.likeBlog)
  router.post('/api/blog/set/dislike', blog.dislikeBlog)
}
