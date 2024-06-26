import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
// import userRouter from './routes/user';
// import authRouter from './routes/auth';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// routes.
//app.use('/api/users', userRouter);
// app.use('/api/auth', authRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
})