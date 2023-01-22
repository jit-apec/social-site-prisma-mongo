"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = exports.list = exports.deletepost = exports.create = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, content, authorId } = req.body;
        if (req.file) {
            let image = req.file.path;
            yield prisma.post.create({
                data: {
                    title: title,
                    description: description,
                    content: content,
                    image: image,
                    author: { connect: { id: authorId } },
                }
            });
        }
        return res.status(200).json({ message: 'post shared successfully', success: true });
    }
    catch (error) {
        return res.status(500).send({ message: error, success: false });
    }
});
exports.create = create;
const deletepost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const user = yield prisma.user.delete({ where: { id } });
        console.log(user);
        return res.status(200).json({ message: 'post deleted successfully', success: true });
    }
    catch (error) {
        return res.status(500).send({ message: error, success: false });
    }
});
exports.deletepost = deletepost;
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.user.findMany({
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
        });
        if (!data)
            return res.status(200).json({ message: "Post Not Found", success: false });
        return res.status(200).json({ message: 'post found', success: true, data: data });
    }
    catch (error) {
        return res.status(500).send({ message: error, success: false });
    }
});
exports.list = list;
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.post.findUnique({
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
        });
        if (!data)
            return res.status(200).json({ message: "Post Not Found", success: false, data: data });
        return res.status(200).json({ message: 'post found', success: true, data: data });
    }
    catch (error) {
        return res.status(500).send({ message: error, success: false });
    }
});
exports.view = view;
