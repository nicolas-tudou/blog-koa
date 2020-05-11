import { Blog, User, Category, Tag, TagBlog, Comment } from '../models'
import { Op } from 'sequelize'
import BLog from '../controller/blog'

export default class blogService {
  static async createNewBlog(title, logo, brief, authId, categoryId, tags, detail) {
    return Blog.create({ title, logo, brief, authId, categoryId, detail })
  }
  static async updateBlog(id, ...params) {
    return BLog.update({ ...params }, { where: id })
  }
  static async getBlogList(title, categoryId, authId, status) {
    return Blog.findAndCountAll({
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
          attributes: ['id', 'name']
        },
        {
          model: Tag,
          attributes: ['id']
        },
        {
          model: Comment,
          attributes: ['id']
        },
        {
          model: Category,
          attributes: ['id', 'category']
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
    return BLog.findOne({
      include: [
        {
          model: User,
          attributes: ['id']
        },
        {
          model: Tag,
          attributes: ['id']
        },
        {
          model: Category,
          attributes: ['id']
        }
      ],
      attributes: {
        exclude: ['c_time', 'u_time', 'read_num', 'like_num', 'dislike_num']
      },
      where: {
        id
      }
    })
  }
  static async updateBlogStatus(id, status) {
    return Blog.update({
      status
    }, { where: { id } })
  }
  static async likeBlog(id, step) {
    let blog = await BLog.findOne({ where: { id } })
    return blog.increment('likeNum', step)
  }
  static async dislikeNum(id, step) {
    let blog = await Blog.findOne({ where: { id } })
    return Blog.increment('dislikeNum', step)
  }
}
