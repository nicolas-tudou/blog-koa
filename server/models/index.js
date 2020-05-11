import sequelize from '../lib/sequelize'

export const User = sequelize.import(__dirname + '/user.js')
export const Blog = sequelize.import(__dirname + '/blog.js')
export const Category = sequelize.import(__dirname + '/category.js')
export const Comment = sequelize.import(__dirname + '/comment.js')
export const Tag = sequelize.import(__dirname + '/tag.js')
export const TagBlog = sequelize.import(__dirname + '/tagBlog.js')

User.hasMany(Blog, {
  foreignKey: 'auth_id',
  targetKey: 'id'
})
Blog.belongsTo(User, {
  foreignKey: 'auth_id',
  sourceKey: 'id'
})

Category.hasMany(Blog, {
  foreignKey: 'category_id',
  targetKey: 'id'
})
Blog.belongsTo(Category, {
  foreignKey: 'category_id',
  sourceKey: 'id'
})

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  targetKey: 'id'
})
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
  sourceKey: 'id'
})

Tag.belongsToMany(Blog, {
  through: TagBlog,
  foreignKey: 'tag_id'
})
Blog.belongsToMany(Tag, {
  through: TagBlog,
  foreignKey: 'blog_id'
})
