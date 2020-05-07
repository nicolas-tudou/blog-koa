import User from '../controller/user'
import jwt from '../lib/jwt'
import identifyCheck from '../lib/identifyCheck'
import identify from '../config/identify'

export default router => {
  router.post('/api/admin/signIn', User.signIn)
  router.post('/api/admin/signUp', User.signUp)
  router.post('/api/admin/user/query/list', jwt, User.getUserList)
  router.post('/api/admin/user/set/add', jwt, identifyCheck(identify.ADMIN), User.addUser)
  router.post('/api/admin/user/set/delete', jwt, identifyCheck(identify.ADMIN), User.deleteUser)
  router.post('/api/admin/user/set/lock', jwt, identifyCheck(identify.ADMIN), User.lockUser)
  router.post('/api/admin/user/set/unlock', jwt, identifyCheck(identify.ADMIN), User.unlockUser)
}
