import tag from '../models/tag'
export default class Tag {
  static async getOne(tagName) {
    return tag.findOne({ where: { tag: tagName } })
  }
}
