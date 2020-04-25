export function getTagListApi () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: [
          {
            id: 1,
            tagName: 't1',
            color: '#f50',
            useNum: 32,
            createTime: '2020-04-23 12:32',
            updateTime: '2020-04-23 12:32',
            status: 1
          },
          {
            id: 2,
            tagName: 't2',
            color: '#f50',
            useNum: 32,
            createTime: '2020-04-23 12:32',
            updateTime: '2020-04-23 12:32',
            status: 2
          },
          {
            id: 3,
            tagName: 't3',
            color: '#f50',
            useNum: 32,
            createTime: '2020-04-23 12:32',
            updateTime: '2020-04-23 12:32',
            status: 1
          }
        ]
      })
    })
  }, 600)
}

// getTagListApi, addTagApi, showTagApi, hideTagApi, deleteTagApi

export function addTagApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}

export function showTagApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}

export function hideTagApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}

export function deleteTagApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}
