import { Login, Register} from '../controller/auth'

import express from 'express';

const AuthRouter = express.Router()
AuthRouter.post('/register',Register)
AuthRouter.post('/login',Login)


export default AuthRouter

