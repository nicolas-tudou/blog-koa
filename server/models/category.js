/**
 * id BIGINT(20) PRIMARY KEY auto_increment,
    category VARCHAR(20) not null,
    blogNum BIGINT(30) not null,
    c_time TIMESTAMP default CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP on UPDATE CURRENT_TIMESTAMP,
    status int(1) not NULL DEFAULT 1 comment "分类状态：1-正常 2-下架 3-已删除"
 */

export default (sequelize, DataTypes) => sequelize.define('t_category', {
  id: {
    type: DataTypes.INTEGER(),
    field: 'id',
    primaryKey: true
  },
  category: {
    type: DataTypes.STRING(),
    field: 'category',
    allowNull: false
  },
  blogNum: {
    type: DataTypes.INTEGER(),
    field: 'blog_num',
    default: 0
  },
  createTime: {
    type: DataTypes.DATE(),
    field: 'c_time'
  },
  updateTime: {
    type: DataTypes.DATE(),
    field: 'u_time'
  },
  status: {
    type: DataTypes.INTEGER(),
    field: 'status',
    default: 1
  }
 }, { createdAt: 'c_time', updatedAt: 'u_time', tableName: 't_category' })
 