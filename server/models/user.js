/**
 * CREATE table IF NOT EXISTS t_user(
    id BIGINT(20) PRIMARY KEY auto_increment,
    name VARCHAR(20) not null,
    avatar VARCHAR(255) NOT NULL default "",
    password VARCHAR(20) not null,
    identify int(1) not null DEFAULT 2 comment "用户角色：1-超级管理员；2-管理员 3-普通角色",
    c_time TIMESTAMP default CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status int(1) not null comment "用户状态：1-正常；2-锁定；3-已删除"
    );
 */
export default (sequelize, DataTypes) => sequelize.define('t_user', {
  id: {
    type: DataTypes.INTEGER(),
    field: 'id',
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(),
    field: 'name',
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING(),
    field: 'avatar',
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(),
    field: 'password',
    allowNull: false
  },
  identify: {
    type: DataTypes.INTEGER(),
    field: 'identify'
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
    field: 'status'
  }
}, { createdAt: 'c_time', updatedAt: 'u_time', tableName: 't_user' })
