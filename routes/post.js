"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../controller/post");
const express_1 = __importDefault(require("express"));
const upload_1 = require("../middleware/upload");
const PostRouter = express_1.default.Router();
PostRouter.post('/create', upload_1.upload.single('image'), post_1.create);
PostRouter.get('/list/:id', post_1.list);
PostRouter.delete('/delete/:id', post_1.deletepost);
PostRouter.get('/view/:id', post_1.view);
exports.default = PostRouter;
