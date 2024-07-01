"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this file contains the routes for the user endpoints
// it contains the routes for getting all users, getting a user by id, getting a user by email,
// updating a user, and deleting a user
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/users', auth_1.authenticateToken, userController_1.getUsers);
router.get('/user?', auth_1.authenticateToken, userController_1.getUserById);
router.get('/user/:email', auth_1.authenticateToken, userController_1.getUserByEmail);
router.put('/user/:id', auth_1.authenticateToken, userController_1.updateUser);
router.delete('/user/:id', auth_1.authenticateToken, userController_1.deleteUserById);
exports.default = router;
