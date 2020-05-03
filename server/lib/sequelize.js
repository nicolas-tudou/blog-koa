import Sequelize from 'sequelize'

import { DB } from '../config'

const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
  host: DB.host,
  dialect: 'mysql',
  port: DB.port,
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  }
})

export default sequelize
