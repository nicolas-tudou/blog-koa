export const categoryColumns = [
  {
    title: '名称',
    dataIndex: 'category',
    align: 'center'
  },
  {
    title: '分类id',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '博客数量',
    dataIndex: 'blogNum',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'categoryStatus' }
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