import express from 'express'
import AuthRouter  from './routes/auth';
import CommentRouter from './routes/comment';
import PostRouter from './routes/post';

const app = express();
const cors = require('cors');

app.use(express.json())
app.use('/auth',AuthRouter)
app.use('/post',PostRouter)
app.use('/comment',CommentRouter)


export = app