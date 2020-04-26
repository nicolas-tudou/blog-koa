export default router => {
  router.post('/test', (req, res) => {
    res.send('hello world, test code')
  })
}
