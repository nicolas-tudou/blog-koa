export const blogColumns = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    width: 100,
    fixed: 'left'
  },
  {
    title: '文章id',
    dataIndex: 'id',
    align: 'center',
    width: 100
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'blogStatus' }
  },
  {
    title: '分类',
    dataIndex: 'categoryName',
    align: 'center',
    width: 100
  },
  {
    title: '作者',
    dataIndex: 'authName',
    align: 'center',
    width: 100
  },
  {
    title: '简介',
    dataIndex: 'brief',
    align: 'center',
    width: 300,
    scopedSlots: { customRender: 'blogBrief' }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    width: 200
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
    width: 200
  },
  {
    title: '阅读次数',
    dataIndex: 'readNum',
    align: 'center',
    width: 200
  },
  {
    title: '评论数',
    dataIndex: 'commentNum',
    align: 'center',
    width: 100
  },
  {
    title: '标签',
    dataIndex: 'tags',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'blogTags' }
  },

  {
    title: '操作',
    dataIndex: '',
    align: 'center',
    width: 260,
    fixed: 'right',
    scopedSlots: { customRender: 'operation' }
  }
]
