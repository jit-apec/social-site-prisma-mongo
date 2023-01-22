import { create , like} from '../controller/comment'
import  express  from "express"

const CommentRouter = express.Router()

CommentRouter.post('/create',create)
CommentRouter.post('/like',like)


export default CommentRouter