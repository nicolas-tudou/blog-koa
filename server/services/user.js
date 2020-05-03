import jsonwebtoken from 'jsonwebtoken'
import user from '../models/user'

export default class UserServer {
  static async getOne (name) {
    return user.findOne({
      where: {
        name
      }
    })
  }
  static async create (username, password, avatar) {
    return user.create({
      name: username,
      password: password,
      avatar: avatar
    })
  }
  static async parseToken (token) {
    return jsonwebtoken.decode(token).data
  }
}
