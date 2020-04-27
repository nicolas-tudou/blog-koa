import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

/**
 * CREATE table IF NOT EXISTS t_blog_tag(
    id BIGINT(20) PRIMARY KEY auto_increment,
    tag_id BIGINT(20) not NULL,
    blog_id BIGINT(20) not NULL,
    c_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
 */
export default sequelize.define('t_tag_blog', {
  id: {
    type: Sequelize.INTEGER,
    filed: 'id',
    primaryKey: true
  },
  tagId: {
    type: Sequelize.INTEGER,
    filed: 'tag_id',
    allowNull: false
  },
  blogId: {
    type: Sequelize.INTEGER,
    filed: 'blog_id',
    allowNull: false
  },
  createTime: {
    type: Sequelize.DATE,
    filed: 'c_time'
  },
  updateTime: {
    type: Sequelize.DATE,
    filed: 'u_time'
  }
}, { createdAt: 'c_time', updatedAt: 'u_time' })
