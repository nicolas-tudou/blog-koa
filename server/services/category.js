import category from '../models/category'
import sequelize from 'sequelize'
const Op = sequelize.Op
export default class Category {
  static async getOne(categoryName) {
    return category.findOne({
      where: {
        category: categoryName
      }
    })
  }
  static async createCategory(categoryName) {
    return category.create({
      category: categoryName
    })
  }
  static async updateCategory(id, categoryName) {
    return category.update({ category: categoryName }, { where: { id } })
  }
  static async getCategoryList(name, status) {
    if (status === -1) {
      console.log('---->', status)
      return category.findAndCountAll({
        where: {
          category: {
            [Op.like]: `%${name}%`
          }
        },
        order: [
          ['blog_num', 'DESC']
        ]
      })
    } else {
      return category.findAndCountAll({
        where: {
          [Op.and]: [
            {
              category: {
                [Op.like]: `%${name}%`
              }
            },
            {
              status
            }
          ]
        }
      })
    }
  }
  static async getCount(status) {
    if (status > 0) {
      return category.count({ where: { status } })
    } else {
      return category.count()
    }
  }
  static async hideCategory(categoryId) {
    return category.update({ status: 2 }, { where: { id: categoryId }})
  }
  static async showCategory(categoryId) {
    return category.update({ status: 1 }, { where: { id: categoryId }})
  }
  static async deleteCategory(categoryId) {
    return category.update({ status: 3 }, { where: { id: categoryId }})
  }
}
