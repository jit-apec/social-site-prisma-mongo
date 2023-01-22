import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const Register = async (req: Request, res: Response) => {
    try {
        const { username, email, phone, password } = req.body
        const findUser = await prisma.user.findFirst({ where: { email } })
        if (!findUser) {
            const encPassword = await bcrypt.hash(password, 15)

            const user = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    phone: phone,
                    password: encPassword,
                }
            })
            return res.status(200).json({ message: 'user added', success: true, data: user })
        } else {
            console.log('already added');
            return res.status(200).json({ message: 'user already exist', success: true, data: findUser })
        }
        
    } catch (error) {

        return res.status(500).send({ message: error, success: false, data: {} })
    }
}

const Login = async (req: Request, res: Response) => {
    try {
        const SECRET_KEY = process.env.SECRET_KEY || 'jdfgkjdlfgyetrgitl765875t8oyaegrtywere'
        const { email, password } = req.body

        const findUser = await prisma.user.findFirst({ where: { email } })
        const data = JSON.parse(JSON.stringify(findUser))

        if (data && (await bcrypt.compare(password, data.password))) {
            let token = JWT.sign({
                id: data.id,
                username: data.username,
                email: data.email,
                phone: data.phone,
            },
                SECRET_KEY)
            JWT
            let payload = {
                id: data.id,
                username: data.username,
                email: data.email,
                phone: data.phone,
                token
            }
            return res.status(200).send({ message: "login success", success: true, data: payload })
        }
        return res.status(404).send({ message: "Email or password not found", success: false, data: req.body })
    } catch (error) {
        return res.status(500).send({ message: error, success: false, data: {} })
    }
}

export {
    Register,
    Login
}
