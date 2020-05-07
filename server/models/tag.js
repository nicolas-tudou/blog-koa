/**
 * CREATE table IF NOT EXISTS t_tag(
    id BIGINT(20) PRIMARY KEY not NULL,
    tag VARCHAR(10) not NULL,
    c_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status int(1) not NULL DEFAULT 1 comment "分类状态：1-正常 2-下架 3-已删除"
    );
 */
export default (sequelize, DataTypes) => sequelize.define('t_tag', {
  id: {
    type: DataTypes.INTEGER(),
    field: 'id',
    primaryKey: true
  },
  tag: {
    type: DataTypes.STRING(),
    field: 'tag',
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(),
    field: 'color',
    defaultValue: '#108ee9'
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
}, { createdAt: 'c_time', updatedAt: 'u_time', tableName: 't_tag' })
