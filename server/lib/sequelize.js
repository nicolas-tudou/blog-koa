import Sequelize from 'sequelize'

import { DB } from '../config'

const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
  host: db.host,
  dialect: 'mysql',
  port: db.port,
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  }
})
