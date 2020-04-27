import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

/**
 * id BIGINT(20) PRIMARY KEY auto_increment,
    category VARCHAR(20) not null,
    blogNum BIGINT(30) not null,
    c_time TIMESTAMP default CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP on UPDATE CURRENT_TIMESTAMP,
    status int(1) not NULL DEFAULT 1 comment "分类状态：1-正常 2-下架 3-已删除"
 */

 const category = sequelize.define('t_category', {
  id: {
    type: Sequelize.INTEGER,
    filed: 'id',
    primaryKey: true
  },
  category: {
    type: Sequelize.STRING,
    filed: 'category',
    allowNull: false
  },
  blogNum: {
    type: Sequelize.INTEGER,
    filed: 'blog_num',
    default: 0
  }
  createTime: {
    type: Sequelize.DATE,
    filed: 'c_time'
  },
  updateTime: {
    type: Sequelize.DATE,
    filed: 'u_time'
  },
  status: {
    type: Sequelize.INTEGER,
    filed: 'status',
    allowNull: false,
    default: 1
  }
 }, { createdAt: 'c_time', updatedAt: 'u_time' })