/**
 * CREATE table IF NOT EXISTS t_comment(
    id BIGINT(20) PRIMARY KEY auto_increment,
    blog_id BIGINT(20) not NULL,
    parent BIGINT(20),
    comment VARCHAR(500) not NULL,
    user VARCHAR(20) not null,
    user_avatar VARCHAR(255) not NULL,
    c_time TIMESTAMP default CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP on UPDATE CURRENT_TIMESTAMP
    );
 */
export default (sequelize, DataTypes) => sequelize.define('t_comment', {
  id: {
    type: DataTypes.INTEGER(),
    field: 'id',
    primaryKey: true
  },
  blogId: {
    type: DataTypes.STRING(),
    field: 'blog_id',
    allowNull: false
  },
  parent: {
    type: DataTypes.STRING(),
    field: 'parent'
  },
  comment: {
    type: DataTypes.STRING(),
    field: 'comment',
    allowNull: false
  },
  user: {
    type: DataTypes.STRING(),
    field: 'user',
    allowNull: false
  },
  userAvatar: {
    type: DataTypes.STRING(),
    field: 'user_avatar',
    allowNull: false
  },
  createTime: {
    type: DataTypes.DATE(),
    field: 'c_time'
  },
  updateTime: {
    type: DataTypes.DATE(),
    field: 'u_time'
  }
}, { createdAt: 'c_time', updatedAt: 'u_time', tableName: 't_comment' })
