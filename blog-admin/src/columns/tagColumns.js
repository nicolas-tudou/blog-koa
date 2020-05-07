export const tagColumns = [
  {
    title: '名称',
    dataIndex: 'tag',
    align: 'center'
  },
  {
    title: '标签ID',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '使用数量',
    dataIndex: 'useNum',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'tagStatus' }
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