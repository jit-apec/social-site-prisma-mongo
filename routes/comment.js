"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("../controller/comment");
const express_1 = __importDefault(require("express"));
const CommentRouter = express_1.default.Router();
CommentRouter.post('/create', comment_1.create);
CommentRouter.post('/like', comment_1.like);
exports.default = CommentRouter;
