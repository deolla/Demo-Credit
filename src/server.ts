import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/userRoute';
import registerRoute from './routes/registerRouter'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// routes.
app.use('/api', userRouter);
app.use('/api', registerRoute);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
})