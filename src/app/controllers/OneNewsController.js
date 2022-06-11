import * as Yup from 'yup'
import News from '../models/News'
import Category from '../models/Category'

class ExistController {
  async store(request, response) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      preview: Yup.string().required(),
      content: Yup.string().required(),
      category_id: Yup.number().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      })
    }

    const { filename: path } = request.file
    const { title, preview, content, category_id } = request.body
  }

  async index(request, response) {
    const { id } = request.params

    const noticeId = await News.findByPk(id)

    if (!noticeId) {
      return response.status(401).json({
        error: 'Notices not found, verify your notices Id is correct.',
      })
    }

    ;({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })

    return response.json(noticeId)
  }
}

export default new  ExistController 

