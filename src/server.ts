import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoute';
import transactionRoute from './routes/transactionRoute';
import walletRouter from './routes/walletRoute';

dotenv.config();
const app = express();
//const PORT = process.env.PORT || 3000;
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// routes.
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', transactionRoute);
app.use('/api', walletRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});

export default app;