import Sequelize, { Model } from 'sequelize'

class Category extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get () {
            return `https://code-news-fjsf6unu8-plsr12.vercel.app/category-file/${this.path}`
          }
        }
      },

      {
        sequelize
      }
    )
    return this
  }
}

export default Category
