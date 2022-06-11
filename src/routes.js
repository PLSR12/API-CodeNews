import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

const upload = multer(multerConfig)
const routes = new Router()

import NewsController from './app/controllers/NewsController'
import CategoryController from './app/controllers/CategoryController'
import OneNewsController from './app/controllers/OneNewsController'

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' })
})

routes.post('/notices', upload.single('file'), NewsController.store)
routes.get('/notices', NewsController.index)
routes.get('/notice/:id', OneNewsController.index)
routes.put('/notices/:id', upload.single('file'), NewsController.update)

routes.post('/category', upload.single('file'), CategoryController.store)
routes.get('/category', CategoryController.index)
routes.put('/category/:id', upload.single('file'), CategoryController.update)

export default routes
