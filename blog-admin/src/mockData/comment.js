export function getCommentApi() {
  return new Promise(resolve => {
    resolve({
      success: true,
      list: [
        {
          id: 1,
          blogId: 1,
          blogName: 'title 1',
          comment: 'comment for blog above',
          userId: 1,
          userAvatar: '',
          createTime: '2020-04-24 13:43',
          updateTime: '2020-04-24 13:43',
          children: [
            {
              id: 1,
              blogId: 1,
              blogName: 'title 1',
              comment: 'sub comment for blog above',
              userId: 1,
              userAvatar: '',
              createTime: '2020-04-24 13:43',
              updateTime: '2020-04-24 13:43',
            }
          ]
        },
        {
          id: 2,
          blogId: 1,
          blogName: 'title 1',
          comment: '2 comment for blog above',
          userId: 1,
          userAvatar: '',
          createTime: '2020-04-24 13:43',
          updateTime: '2020-04-24 13:43',
          children: [
            {
              id: 2,
              blogId: 1,
              blogName: 'title 1',
              comment: 'sub 2 comment for blog above',
              userId: 1,
              userAvatar: '',
              createTime: '2020-04-24 13:43',
              updateTime: '2020-04-24 13:43',
            }
          ]
        }
      ]
    })
  })
}

export function addCommentApi() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        comment: {
          id: 1000,
          blogId: 1,
          blogName: 'title 1',
          comment: 'comment for blog above',
          userId: 1,
          userAvatar: '',
          createTime: '2020-04-24 13:43',
          updateTime: '2020-04-24 13:43',
        }
      })
    })
  })
}
