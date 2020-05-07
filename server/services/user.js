import jsonwebtoken from 'jsonwebtoken'
import { User } from '../models'
import { Op } from 'sequelize'

export default class UserServer {
  static async getOne (name) {
    return User.findOne({
      where: {
        name
      }
    })
  }
  static async getUserList (name, identify, status) {
    return User.findAndCountAll({
      where: {
        [Op.and]: [
          {
            name: {
              [Op.like]: `%${name}%`
            },
          },
          {
            identify: identify == -1 ? { [Op.notIn]: [identify] } : identify,
          },
          {
            status: status == -1 ? { [Op.notIn]: [status] } : status
          }
        ]
      }
    })
  }
  static async setUserStatus(id, status) {
    return User.update({ status }, {
      where: {
        id
      }
    })
  }
  static async create (username, password, avatar) {
    return User.create({
      name: username,
      password: password,
      avatar: avatar
    })
  }
  static async parseToken (token) {
    return jsonwebtoken.decode(token).data
  }
}
