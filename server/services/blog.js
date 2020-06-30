import { Blog, User, Category, Tag, TagBlog, Comment } from '../models'
import sequelize from 'sequelize'
const Op = sequelize.Op

export default class blogService {
  static async createNewBlog(title, logo, brief, authId, categoryId, tags, detail) {
    return Blog.create({ title, logo, brief, authId, categoryId, detail })
  }
  static async updateBlog(id, params) {
    console.log('=====>', params)
    return Blog.update(params, { where: { id } })
  }
  static async getBlogList(title = '', categoryId = -1, authId = -1, status = -1, page = 1, pageSize = 10) {
    return Blog.findAndCountAll({
      offset: page * pageSize - pageSize,
      limit: pageSize,
      attributes: [
        'id',
        'title',
        'logo',
        'brief',
        'authId',
        'readNum',
        'likeNum',
        'dislikeNum',
        'createTime',
        'updateTime',
        'status'
      ],
      include: [
        {
          model: User,
          attributes: [['id', 'authId'], ['name', 'authName']]
        },
        {
          model: Tag,
          attributes: [['id', 'tagId'], ['tag', 'tag'], 'color']
        },
        {
          model: Comment,
          attributes: [
            ['id', 'comontId']
          ]
        },
        {
          model: Category,
          attributes: [['id', 'categoryId'], ['category', 'categoryName']]
        }
      ],
      where: {
        [Op.and]: [
          {
            title: {
              [Op.like]: `%${title}%`
            }
          },
          {
            categoryId: categoryId === -1 ? { [Op.notIn]: [categoryId] } : categoryId
          },
          {
            authId: authId === -1 ? { [Op.notIn]: [authId] } : authId
          },
          {
            status: status === -1 ? { [Op.notIn]: [status] } : status
          }
        ]
      }
    })
  }
  static async getBlogDetail(id) {
    return Blog.findOne({
      include: [
        {
          model: User,
          attributes: [['id', 'authId'], ['name', 'authName']]
        },
        {
          model: Tag,
          attributes: [['id', 'tagId'], ['tag', 'tagName'], 'color']
        },
        {
          model: Category,
          attributes: [['id', 'categoryId']]
        }
      ],
      attributes: {
        exclude: ['c_time', 'u_time', 'read_num', 'like_num', 'dislike_num', 'auth_id', 'category_id']
      },
      where: {
        id
      }
    })
  }
  static async readBlog(id) {
    let blog = await Blog.findOne({ where: { id } })
    return blog.increment('readNum')
  }
  static async updateBlogStatus(id, status) {
    return Blog.update({
      status
    }, { where: { id } })
  }
  static async likeBlog(id, step) {
    let blog = await Blog.findOne({ where: { id } })
    return step > 0 ? blog.increment('likeNum') : blog.decrement('likeNum')
  }
  static async dislikeBlog(id, step) {
    let blog = await Blog.findOne({ where: { id } })
    return step > 0 ? blog.increment('dislikeNum') : blog.decrement('dislikeNum')
  }
}
