import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

/**
 * CREATE table IF NOT EXISTS t_user(
    id BIGINT(20) PRIMARY KEY auto_increment,
    name VARCHAR(20) not null,
    avatar VARCHAR(255) NOT NULL default "",
    password VARCHAR(20) not null,
    identify int(1) not null DEFAULT 2 comment "用户角色：1-超级管理员；2-管理员 3-普通角色",
    c_time TIMESTAMP default CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status int(1) not null comment "用户状态：1-正常；2-锁定；3-失效；4-已删除"
    );
 */
export default sequelize.define('t_user', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    field: 'avatar',
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    field: 'password',
    allowNull: false
  },
  identify: {
    type: Sequelize.INTEGER,
    field: 'identify'
  },
  createTime: {
    type: Sequelize.DATE,
    field: 'c_time'
  },
  updateTime: {
    type: Sequelize.DATE,
    field: 'u_time'
  },
  status: {
    type: Sequelize.INTEGER,
    field: 'status'
  }
}, { createdAt: 'c_time', updatedAt: 'u_time', tableName: 't_user' })
