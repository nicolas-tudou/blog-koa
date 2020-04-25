export const getUserListApi = () => {
  return new Promise(resolve => {
    resolve({
      list: [
        {
          id: 1,
          userName: 'u1',
          identify: 1,
          avatar: '',
          blogNum: 23,
          status: 1,
          createTime: '2020-04-23 09:12',
          updateTime: '2020-04-23 09:12'
        },
        {
          id: 2,
          userName: 'u2',
          identify: 2,
          avatar: '',
          blogNum: 23,
          status: 2,
          createTime: '2020-04-23 09:12',
          updateTime: '2020-04-23 09:12'
        }
      ]
    })
  })
}
/**
getUserListApi, addUserApi, showUserApi, hideUserApi, deleteUserApi
 */

export function addUserApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}

export function showUserApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}

export function hideUserApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}

export function deleteUserApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}

export function lockUserApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}

export function unLockUserApi () {
  return new Promise(resolve => {
    resolve({
      msg: '操作成功'
    })
  })
}
