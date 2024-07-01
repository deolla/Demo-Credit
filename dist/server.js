"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const transactionRoute_1 = __importDefault(require("./routes/transactionRoute"));
const walletRoute_1 = __importDefault(require("./routes/walletRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// routes.
app.use('/api', userRoute_1.default);
app.use('/api', authRoute_1.default);
app.use('/api', transactionRoute_1.default);
app.use('/api', walletRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});
exports.default = app;
