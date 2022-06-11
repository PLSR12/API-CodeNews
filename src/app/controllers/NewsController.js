import * as Yup from 'yup'
import News from '../models/News'
import Category from '../models/Category'

class NewController {
  async store (request, response) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      preview: Yup.string().required(),
      content: Yup.string().required(),
      category_id: Yup.number().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({
        error: err.errors
      })
    }

    const { filename: path } = request.file
    const { title, preview, content, category_id } = request.body

    const notice = await News.create({
      title,
      preview,
      content,
      category_id,
      path
    })

    return response.json(notice)
  }

  async index (request, response) {

    const notices = await News.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    })

    return response.json(notices)
  }F

  async update (request, response) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      preview: Yup.string().required(),
      content: Yup.string().required(),
      category_id: Yup.number().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({
        error: err.errors
      })
    }

    const { id } = request.params

    const noticeId = await News.findByPk(id)

    if (!noticeId) {
      return response.status(401).json({
        error: 'Notices not found, verify your notices Id is correct.'
      })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    const { title, preview, content, category_id } = request.body

    const notice = await News.update(
      {
        title,
        preview,
        content,
        category_id
      },

      { where: { id } }
    )
    return response.json({ title, preview, category_id })
  }
}

export default new NewController()
