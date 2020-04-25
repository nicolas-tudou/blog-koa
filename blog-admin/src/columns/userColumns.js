export const userColumns = [
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center'
  },
  {
    title: '用户ID',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '博客数量',
    dataIndex: 'blogNum',
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'identify',
    align: 'center',
    scopedSlots: { customRender: 'userIdentify' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'userStatus' }
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
    title: '操作',
    dataIndex: '',
    align: 'center',
    width: 260,
    scopedSlots: { customRender: 'operation' }
  }
]