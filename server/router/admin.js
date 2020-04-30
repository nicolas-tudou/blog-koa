import user from '../controller/user'

export default router => {
  router.post('/admin/signIn', user.signIn)
  router.post('/admin/signUp', user.signUp)
}
