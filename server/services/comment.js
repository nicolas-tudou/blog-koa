import { Comment, Blog } from '../models'
import { Op } from 'sequelize'

export default class CommentService {
  static async createComment(blogId, parent, userName, userAvatar, comment) {
    return Comment.create({
      blogId,
      parent,
      user: userName,
      userAvatar,
      comment
    })
  }
  static async getCommentList(blogId) {
    return Comment.findAll({
      distinct: true,
      attributes: {
        include: ['id', 'blogId', 'parent', 'comment', ['user', 'userName'], 'userAvatar', 'createTime'],
        exclude: ['blog_id', 'c_time', 'u_time', 'user']
      },
      where: { blogId }
    })
  }
}
