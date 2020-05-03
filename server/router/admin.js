import User from '../controller/user'
import jwt from '../lib/jwt'

export default router => {
  router.post('/api/admin/signIn', User.signIn)
  router.post('/api/admin/signUp', User.signUp)
}
