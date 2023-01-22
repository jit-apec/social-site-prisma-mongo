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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, phone, password } = req.body;
        const findUser = yield prisma.user.findFirst({ where: { email } });
        if (!findUser) {
            const encPassword = yield bcrypt_1.default.hash(password, 15);
            const user = yield prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    phone: phone,
                    password: encPassword,
                }
            });
            return res.status(200).json({ message: 'user added', success: true, data: user });
        }
        else {
            console.log('already added');
            return res.status(200).json({ message: 'user already exist', success: true, data: findUser });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error, success: false, data: {} });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SECRET_KEY = process.env.SECRET_KEY || 'jdfgkjdlfgyetrgitl765875t8oyaegrtywere';
        const { email, password } = req.body;
        const findUser = yield prisma.user.findFirst({ where: { email } });
        const data = JSON.parse(JSON.stringify(findUser));
        if (data && (yield bcrypt_1.default.compare(password, data.password))) {
            let token = jsonwebtoken_1.default.sign({
                id: data.id,
                username: data.username,
                email: data.email,
                phone: data.phone,
            }, SECRET_KEY);
            jsonwebtoken_1.default;
            let payload = {
                id: data.id,
                username: data.username,
                email: data.email,
                phone: data.phone,
                token
            };
            return res.status(200).send({ message: "login success", success: true, data: payload });
        }
        return res.status(404).send({ message: "Email or password not found", success: false, data: req.body });
    }
    catch (error) {
        return res.status(500).send({ message: error, success: false, data: {} });
    }
});
exports.Login = Login;
