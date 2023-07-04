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
exports.profile = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Lawyer_1 = __importDefault(require("../models/Lawyer"));
const Client_1 = __importDefault(require("../models/Client"));
const dotenv_1 = __importDefault(require("dotenv"));
const authUtils_1 = require("../utils/authUtils");
dotenv_1.default.config();
const { JWT_SECRET } = process.env;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { isClient } = req.query;
    try {
        //saving new user
        const hashedPassword = yield (0, authUtils_1.encryptPassword)(password);
        const newUser = isClient ? new Client_1.default(Object.assign(Object.assign({}, req.body), { hashedPassword })) : new Lawyer_1.default(Object.assign(Object.assign({}, req.body), { hashedPassword }));
        yield newUser.save();
        //token
        const token = jsonwebtoken_1.default.sign({ _id: newUser._id }, JWT_SECRET || 'Secret');
        return res.header('token', token).status(201).json(newUser);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { isClient } = req.query;
    try {
        //find user
        const user = isClient ? yield Client_1.default.findOne({ email }) : yield Lawyer_1.default.findOne({ email });
        if (!user)
            throw new Error('Usuario o contraseña incorrecta');
        //password validation
        const validation = yield (0, authUtils_1.validatePassword)(password, user.hashedPassword);
        if (!validation)
            throw new Error('Contraseña incorrecta');
        //token
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, JWT_SECRET || 'Secret');
        return res.header('token', token).status(200).json(user);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
});
exports.signin = signin;
const profile = (req, res) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.substring(7);
    console.log(token);
    return res.status(200).json(token);
};
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map