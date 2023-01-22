import { create, list, view,deletepost } from '../controller/post'
import express from 'express'

import { upload } from '../middleware/upload'

const PostRouter = express.Router()
PostRouter.post('/create',upload.single('image'), create)
PostRouter.get('/list/:id', list)
PostRouter.delete('/delete/:id', deletepost)
PostRouter.get('/view/:id', view)


export default PostRouter
