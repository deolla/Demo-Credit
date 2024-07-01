"use strict";
// this file contains the routes for the wallet controller
// the routes are /wallet, /wallet/balance, /wallet/delete
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletController_1 = require("../controllers/walletController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/wallet', auth_1.authenticateToken, walletController_1.getWallets);
router.get('/wallet/balance?', auth_1.authenticateToken, walletController_1.getWalletBalance); // queried by walletId
// router.delete('/wallet?', authenticateToken, deleteWallet); // queried by walletId
exports.default = router;
