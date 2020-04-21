export const getUserListApi = () => {
  return new Promise(resolve => {
    resolve({
      list: [
        {
          id: 1,
          userName: 'u1'
        },
        {
          id: 2,
          userName: 'u2'
        }
      ]
    })
  })
}
