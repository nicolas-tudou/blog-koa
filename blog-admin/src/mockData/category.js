export const getCategoryListApi = () => {
  return new Promise(resolve => {
    resolve({
      list: [
        {
          id: 1,
          category: 'c1'
        },
        {
          id: 2,
          category: 'c2'
        }
      ]
    })
  })
}