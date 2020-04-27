import Sequelize, { STRING } from "sequelize"
import sequelize from '../lig/sequelize'
import category from './category'
import tagBlog from './tagBlog'
import user from './user'
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
const blog = sequelize.define('t_blog', {
  id: {
    type: Sequelize.INTEGER,
    filed: 'id',
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    filed: 'title',
    allowNull: false
  },
  categoryId: {
    type: Sequelize.INTEGER,
    filed: 'category_id',
    allowNull: false
  },
  authId: {
    type: Sequelize.INTEGER,
    filed: 'auth_id',
    allowNull: false
  },
  logo: {
    type: Sequelize.STRING,
    filed: 'logo',
    allowNull: false
  },
  brief: {
    type: Sequelize.STRING,
    filed: 'brief',
    allowNull: false
  },
  detail: {
    type: Sequelize.TEXT,
    filed: 'detail',
    allowNull: false
  },
  readNum: {
    type: Sequelize.INTEGER,
    filed: 'read_num',
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

blog.belongsTo(category, { foreignKey: 'category_id' })
blog.belongsTo(user, {foreignKey: 'auth_id'})

blog.belongsToMany(tag, {
  through: tagBlog,
  foreignKey: 'blog_id'
})

export default blog
