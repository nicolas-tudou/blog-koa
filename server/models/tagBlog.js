/**
 * CREATE table IF NOT EXISTS t_blog_tag(
    id BIGINT(20) PRIMARY KEY auto_increment,
    tag_id BIGINT(20) not NULL,
    blog_id BIGINT(20) not NULL,
    c_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    u_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
 */
export default (sequelize, DataTypes) => sequelize.define('t_tag_blog', {
  id: {
    type: DataTypes.INTEGER(),
    filed: 'id',
    primaryKey: true
  },
  tagId: {
    type: DataTypes.INTEGER(),
    filed: 'tag_id',
    allowNull: false
  },
  blogId: {
    type: DataTypes.INTEGER(),
    filed: 'blog_id',
    allowNull: false
  },
  createTime: {
    type: DataTypes.DATE(),
    filed: 'c_time'
  },
  updateTime: {
    type: DataTypes.DATE(),
    filed: 'u_time'
  }
}, { createdAt: 'c_time', updatedAt: 'u_time', tableName: 't_blog_tag' })
