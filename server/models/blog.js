/**
 * CREATE table IF NOT EXISTS t_blog(
    id BIGINT(20) PRIMARY KEY auto_increment,
    title VARCHAR(20) not NULL,
    category_id BIGINT(20) not NULL,
    auth_id BIGINT(20) not NULL,
    auth_name VARCHAR(20) not NULL,
    logo VARCHAR(255) not NULL,
    brief varchar(255) not NULL,
    detail text not NULL,
    read_num BIGINT(20) default 0,
    c_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status int(1) default 1 comment "文章状态：1-正常 2-下架 3-已删除"
    );
 */
export default (sequelize, DataTypes) => sequelize.define('t_blog', {
  id: {
    type: DataTypes.INTEGER(),
    field: 'id',
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(),
    field: 'title',
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER(),
    field: 'category_id',
    allowNull: false
  },
  authId: {
    type: DataTypes.INTEGER(),
    field: 'auth_id',
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING(),
    field: 'logo',
    allowNull: false
  },
  brief: {
    type: DataTypes.STRING(),
    field: 'brief',
    allowNull: false
  },
  detail: {
    type: DataTypes.TEXT(),
    field: 'detail',
    allowNull: false
  },
  readNum: {
    type: DataTypes.INTEGER(),
    field: 'read_num',
    defaultValue: 0
  },
  likeNum: {
    type: DataTypes.INTEGER(),
    field: 'like_num',
    defaultValue: 0
  },
  dislikeNum: {
    type: DataTypes.INTEGER(),
    field: 'dislike_num',
    defaultValue: 0
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
}, { createdAt: 'c_time', updatedAt: 'u_time', tableName: 't_blog' })
