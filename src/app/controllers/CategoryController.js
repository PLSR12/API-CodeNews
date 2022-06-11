import * as Yup from 'yup'
import Category from '../models/Category'

class CategoryController {
  async store (request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({
        error: err.errors
      })
    }

    const { name } = request.body

    const { filename: path } = request.file

    const categoryExists = await Category.findOne({
      where: {
        name
      }
    })

    if (categoryExists) {
      return response.status(400).json({
        error: 'Category already exists'
      })
    }

    const { id } = await Category.create({
      name,
      path
    })

    return response.status(201).json({
      id,
      name
    })
  }

  catch (err) {
    console.log(err)
  }

  async index (request, response) {
    const categories = await Category.findAll()

    return response.json(categories)
  }

  async update (request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
      })

      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({
          error: err.errors
        })
      }

      const { name } = request.body

      const { id } = request.params

      const category = await Category.findByPk(id)

      if (!category) {
        return response
          .status(401)
          .json({
            error: 'Category not found, make sure your category id is correct'
          })
      }

      let path
      if (request.file) {
        path = request.file.filename
      }

      await Category.update(
        {
          name,
          path
        },

        { where: { id } }
      )

      return response.status(200).json({name, path})
    } catch (err) {}
  }
}

export default new CategoryController()
