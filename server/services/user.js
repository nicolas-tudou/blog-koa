import jsonwebtoken from 'jsonwebtoken'
import { User, Blog } from '../models'
import { Op } from 'sequelize'

export default class UserServer {
  static async getOne (name) {
    return User.findOne({
      attributes: {
        exclude: ['c_time', 'u_time']
      },
      where: {
        name
      }
    })
  }
  static async getUserList (name, identify, status) {
    return User.findAndCountAll({
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
