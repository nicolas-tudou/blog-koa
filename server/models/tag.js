import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'
import blog from './blog'
import tagblog from 'tagBlog'
/**
 * CREATE table IF NOT EXISTS t_tag(
    id BIGINT(20) PRIMARY KEY not NULL,
    tag VARCHAR(10) not NULL,
    c_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status int(1) not NULL DEFAULT 1 comment "分类状态：1-正常 2-下架 3-已删除"
    );
 */
const tag = sequelize.define('t_user', {
  id: {
    type: Sequelize.INTEGER,
    filed: 'id',
    primaryKey: true
  },
  tag: {
    type: Sequelize.STRING,
    filed: 'tag',
    allowNull: false
  },
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
tag.belongsToMany(blog, {
  through: tagBlog,
  foreignKey: 'tag_id'
})

export default tag
