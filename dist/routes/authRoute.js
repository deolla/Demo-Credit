"use strict";
// this file is responsible for handling the routes for the authentication process
// the routes are /register and /login
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.default.Router();
router.post('/register', AuthController_1.register);
router.post('/login', AuthController_1.login);
exports.default = router;
