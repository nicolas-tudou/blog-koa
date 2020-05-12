import { TagBlog, Tag } from '../models'
import { Op } from 'sequelize'

export default class TagBlogService {
  static async create(tag_id, blog_id) {
    return TagBlog.create({ tag_id, blog_id})
  }
  static async clear(tag_id, blog_id) {
    return TagBlog.destroy({
      where: tag_id === -1 ? {
        blog_id
      } : blog_id === -1? {
        tag_id
      } : {
        [Op.and]: [tag_id, blog_id]
      }
    })
  }
}