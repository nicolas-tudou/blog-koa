import { Tag } from '../models'
import { Op } from 'sequelize'

export default class TagService {
  static async getOne(tagName) {
    return Tag.findOne({ where: { tag: tagName } })
  }
  static async createTag(tagName, color) {
    return Tag.create({ tag: tagName, color })
  }
  static async getTagList(name, status) {
    return Tag.findAndCountAll({
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
