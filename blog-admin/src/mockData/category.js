export const getCategoryListApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: [
          {
            id: 1,
            category: 'c1',
            status: 1,
            blogNum: 32,
            createTime: '2020-04-23 23:32',
            updateTime: '2020-04-23 23:32'
          },
          {
            id: 2,
            category: 'c2',
            status: 2,
            blogNum: 32,
            createTime: '2020-04-23 23:32',
            updateTime: '2020-04-23 23:32'
          }
        ]
      })
    }, 600)
  })
}

// showCategoryApi, hideCategoryApi, deleteCategoryApi

export function addCategoryApi () {
  return new Promise(resolve => {
    resolve({
      meg: '操作成功'
    })
  })
}

export function hideCategoryApi () {
  return new Promise(resolve => {
    resolve({
      meg: '操作成功'
    })
  })
}

export function showCategoryApi () {
  return new Promise(resolve => {
    resolve({
      meg: '操作成功'
    })
  })
}

export function deleteCategoryApi () {
  return new Promise(resolve => {
    resolve({
      meg: '操作成功'
    })
  })
}
