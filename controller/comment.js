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
exports.like = exports.create = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId, comment, subId } = req.body;
        const data = yield prisma.post.findUnique({ where: { id: postId } });
        if (!data)
            return res.status(404).send({ message: "Post Not Found", success: false });
        if (subId === undefined) {
            yield prisma.comment.create({
                data: {
                    comment: comment,
                    userpost: { connect: { id: postId } },
                    username: { connect: { id: userId } },
                }
            });
        }
        else {
            yield prisma.comment.create({
                data: {
                    comment: comment,
                    subcomment: { connect: { id: subId } },
                    userpost: { connect: { id: postId } },
                    username: { connect: { id: userId } },
                }
            });
        }
        return res.status(200).send({ message: "comment success", success: true });
    }
    catch (error) {
        return res.status(500).send({ message: error, success: false });
    }
});
exports.create = create;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId, commentId } = req.body;
        if (commentId === undefined) {
            const data = yield prisma.like.findFirst({
                where: {
                    postId: postId,
                    userId: userId,
                }
            });
            if (data) {
                yield prisma.like.delete({
                    where: { id: data.id }
                });
                return res.status(200).send({ message: "Disliked", success: true });
            }
            else {
                yield prisma.like.create({
                    data: {
                        userpost: { connect: { id: postId } },
                        username: { connect: { id: userId } },
                    }
                });
                return res.status(200).send({ message: "liked", success: true });
            }
        }
        else {
            const data = yield prisma.like.findFirst({
                where: {
                    postId: postId,
                    userId: userId,
                    commentId: commentId
                }
            });
            console.log(data);
            if (data) {
                yield prisma.like.delete({
                    where: { id: data.id }
                });
                return res.status(200).send({ message: "Disliked", success: true });
            }
            else {
                yield prisma.like.create({
                    data: {
                        userpost: { connect: { id: postId } },
                        username: { connect: { id: userId } },
                        postcomments: { connect: { id: commentId } }
                    }
                });
                return res.status(200).send({ message: "liked", success: true });
            }
        }
    }
    catch (error) {
        return res.status(500).send({ message: error, success: false });
    }
});
exports.like = like;
