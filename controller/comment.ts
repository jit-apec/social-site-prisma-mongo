import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const create = async (req: Request, res: Response) => {
    try {

        const { postId, userId, comment, subId } = req.body
        const data = await prisma.post.findUnique({ where: { id: postId } })
        if (!data) return res.status(404).send({ message: "Post Not Found", success: false })
        if (subId === undefined) {
            await prisma.comment.create({
                data: {
                    comment: comment,
                    userpost: { connect: { id: postId } },
                    username: { connect: { id: userId } },
                }
            })
        } else {
            await prisma.comment.create({
                data: {
                    comment: comment,
                    subcomment: { connect: { id: subId } },
                    userpost: { connect: { id: postId } },
                    username: { connect: { id: userId } },
                }
            })
        }
        return res.status(200).send({ message: "comment success", success: true })
    } catch (error) {
        return res.status(500).send({ message: error, success: false })
    }
}
const like = async (req: Request, res: Response) => {
    try {

        const { postId, userId, commentId } = req.body
        if (commentId === undefined) {
            const data = await prisma.like.findFirst({
                where: {
                    postId: postId,
                    userId: userId,
                }
            })
            if (data) {
                await prisma.like.delete({
                    where: { id: data.id }
                })
                return res.status(200).send({ message: "Disliked", success: true })
            } else {
                await prisma.like.create({
                    data: {
                        userpost: { connect: { id: postId } },
                        username: { connect: { id: userId } },
                    }
                })
                return res.status(200).send({ message: "liked", success: true })
            }
        } else {
            const data = await prisma.like.findFirst({
                where: {
                    postId: postId,
                    userId: userId,
                    commentId: commentId
                }
            })
            console.log(data);
            
            if (data) {
                await prisma.like.delete({
                    where: { id: data.id }
                })
                return res.status(200).send({ message: "Disliked", success: true })
            } else {
                await prisma.like.create({
                    data: {
                        userpost: { connect: { id: postId } },
                        username: { connect: { id: userId } },
                        postcomments: { connect: { id: commentId } }
                    }
                })
                return res.status(200).send({ message: "liked", success: true })
            }
        }
    } catch (error) {
        return res.status(500).send({ message: error, success: false })
    }
}

export {
    create,
    like
}
