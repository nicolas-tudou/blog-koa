import { Category, Blog } from '../models'
import { Op } from 'sequelize'

export default class CategoryService {
  static async getOne(categoryName) {
    return Category.findOne({
      where: {
        category: categoryName
      }
    })
  }
  static async createCategory(categoryName) {
    return Category.create({
      category: categoryName
    })
  }
  static async updateCategory(id, categoryName) {
    return Category.update({ category: categoryName }, { where: { id } })
  }
  static async getCategoryList(name, status) {
    return Category.findAndCountAll({
      include: {
        model: Blog,
        attributes: [['id', 'blogId']]
      },
      attributes: {
        exclude: ['c_time', 'u_time']
      },
      distinct: true,
      where: {
        [Op.and]: [
          {
            category: {
              [Op.like]: `%${name}%`
            }
          },
          {
            status: status == -1 ? {
              [Op.notIn]: [-1]
            } : status
          }
        ]
      }
    })
  }
  static async getCount(status) {
    if (status > 0) {
      return Category.count({ where: { status } })
    } else {
      return Category.count()
    }
  }
  static async hideCategory(categoryId) {
    return Category.update({ status: 2 }, { where: { id: categoryId }})
  }
  static async showCategory(categoryId) {
    return Category.update({ status: 1 }, { where: { id: categoryId }})
  }
  static async deleteCategory(categoryId) {
    return Category.update({ status: 3 }, { where: { id: categoryId }})
  }
}
