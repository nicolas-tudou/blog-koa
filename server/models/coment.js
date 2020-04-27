import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'
import blog from './blog'
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
const comment = sequelize.define('t_user', {
  id: {
    type: Sequelize.INTEGER,
    filed: 'id',
    primaryKey: true
  },
  blogId: {
    type: Sequelize.STRING,
    filed: 'blog_id',
    allowNull: false
  },
  parent: {
    type: Sequelize.STRING,
    filed: 'parent',
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING,
    filed: 'comment',
    allowNull: false
  },
  user: {
    type: Sequelize.STRING,
    filed: 'user',
    allowNull: false
  },
  userAvatar: {
    type: Sequelize.STRING,
    filed: 'user_avatar',
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

comment.belongsTo(blog, { foreignKey: 'blog_id' })

export default comment
