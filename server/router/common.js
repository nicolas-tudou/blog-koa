import blog from '../controller/blog'
import category from '../controller/category'
import tag from '../controller/tag'
import comment from '../controller/comment'

export default router => {
  router.post('/test', (req, res) => {
    res.send('hello world, test code')
  })
}
