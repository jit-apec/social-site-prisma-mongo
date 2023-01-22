"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controller/auth");
const express_1 = __importDefault(require("express"));
const AuthRouter = express_1.default.Router();
AuthRouter.post('/register', auth_1.Register);
AuthRouter.post('/login', auth_1.Login);
exports.default = AuthRouter;
