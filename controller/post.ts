import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

const create = async (req: Request, res: Response) => {
    try {

        const { title, description, content, authorId } = req.body
        if (req.file) {
            let image = req.file.path
            await prisma.post.create({
                data: {
                    title: title,
                    description: description,
                    content: content,
                    image: image,
                    author: { connect: { id: authorId } },
                }
            })
        }
        return res.status(200).json({ message: 'post shared successfully', success: true })

    } catch (error) {
        return res.status(500).send({ message: error, success: false })
    }

}
const deletepost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(id)
        const user = await prisma.user.delete({ where: { id } })
        console.log(user)

        return res.status(200).json({ message: 'post deleted successfully', success: true })
    } catch (error) {
        return res.status(500).send({ message: error, success: false })
    }
}



const list = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                phone: true,
                Post: {
                    select: {
                        _count: {},
                        id: true,
                        title: true,
                        content: true,
                        image: true,
                        createdAt: true,
                        Comment: {
                            select: {
                                _count: {},
                                comment: true,
                                nestcomment: {
                                    select: {
                                        _count: {},
                                        comment: true,
                                        nestcomment: {
                                            select: { comment: true },
                                        },
                                    }
                                },
                                Like: {
                                    select: {
                                        username: {
                                            select: {
                                                id: true,
                                                username: true,
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        Like: {
                            select: { id: true }
                        }
                    },
                },
            },
            where: { id },
            take: 10,
        })
        if (!data) return res.status(200).json({ message: "Post Not Found", success: false })

        return res.status(200).json({ message: 'post found', success: true, data: data })

    } catch (error) {
        return res.status(500).send({ message: error, success: false })
    }
}

const view = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await prisma.post.findUnique({
            select: {
                title: true,
                description: true,
                image: true,
                author: {
                    select: {
                        username: true
                    }
                },
                createdAt: true,
                Comment: {
                    select: {
                        _count: {},
                        comment: true,
                        username: {
                            select: {
                                id: true,
                                username: true
                            }
                        },
                        nestcomment: {
                            select: {
                                _count: {},
                                comment: true,
                                nestcomment: {
                                    select: { comment: true },
                                },
                                username: {
                                    select: {
                                        id: true,
                                        username: true
                                    }
                                },
                            }
                        },
                        Like: {
                            select: {
                                username: {
                                    select: {
                                        id: true,
                                        username: true,
                                    },
                                },
                            }
                        }
                    }
                },
                Like: {
                    select: { id: true }
                }

            },

            where: {
                id
            }
        })
        if (!data) return res.status(200).json({ message: "Post Not Found", success: false, data: data })

        return res.status(200).json({ message: 'post found', success: true, data: data })
    } catch (error) {
        return res.status(500).send({ message: error, success: false })
    }
}

export {
    create,
    deletepost,
    list,
    view
}
