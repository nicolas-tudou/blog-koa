export const getBlogListApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 99,
        list: [
          {
            id: 1,
            title: 't1',
            status: 1,
            categoryId: 1,
            categoryName: 'c1',
            authId: 1,
            authName: 'a1',
            brief: 'ndaiwbediuawbeiubda',
            createTime: '2020-03-30',
            updateTime: '2020-03-30',
            readNum: 12,
            commentNum: 30,
            tags: [
              {
                tagId: 1,
                color: '#f50',
                tagName: 'tag1'
              },
              {
                tagId: 2,
                color: '#87d068',
                tagName: 'tag2'
              },
              {
                tagId: 3,
                color: '#108ee9',
                tagName: 'tag3'
              }
            ]
          }
        ]
      })
    }, 500)
  })
}

export const hideBlogApi = () => {
  return new Promise(resolve => {
    resolve({
      msg: 'hide success'
    })
  })
}

export const showBlogApi = () => {
  return new Promise(resolve => {
    resolve({
      msg: 'show success'
    })
  })
}

export const deleteBlogApi = () => {
  return new Promise(resolve => {
    resolve({
      msg: 'delete success'
    })
  })
}

export const getBlogDetailApi = () => {
  return new Promise((resolve) => {
    resolve({
      id: 1,
      title: 'title',
      logo: 'https://pic4.zhimg.com/v2-3479104608fc54ddf239513ac84b55b3_im.jpg',
      brief: 'this is a brief for this blog',
      detail: 'this is a detail for this blog',
      categoryId: 1,
      tags: [
        {
          tagId: 1,
          tagName: 'tag1',
          color: '#f50'
        }
      ],
      comment: [
        {
          commentId: 1,
          comment: 'comment 1'
        },
        {
          commentId: 2,
          comment: 'comment 2'
        }
      ]
    })
  })
}
