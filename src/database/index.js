import Sequelize from 'sequelize'

import News from '../app/models/News'
import Category from '../app/models/Category'

import configDataBase from '../config/database'

const models = [News, Category]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(configDataBase)
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
