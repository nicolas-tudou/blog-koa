import { Tag, Blog } from '../models'
import sequelize from 'sequelize'

const Op = sequelize.Op
export default class TagService {
  static async getOne(tagName) {
    return Tag.findOne({ where: { tag: tagName } })
  }
  static async createTag(tagName, color) {
    return Tag.create({ tag: tagName, color })
  }
  static async getTagList(name, status) {
    return Tag.findAndCountAll({
      include: {
        model: Blog,
        attributes: ['id']
      },
      attributes: {
        exclude: ['c_time', 'u_time']
      },
      distinct: true,
      where: {
        [Op.and]: [
          {
            tag: {
              [Op.like]: `%${name}%`
            }
          },
          {
            status: status === -1 ? { [Op.notIn]: [status] } : status
          }
        ]
      }
    })
  }
  static async showTag(id) {
    return Tag.update({ status: 1 }, { where: { id } })
  }
  static async hideTag(id) {
    return Tag.update({ status: 2 }, { where: { id } })
  }
  static async deleteTag(id) {
    return Tag.update({ status: 3 }, { where: { id } })
  }
}
