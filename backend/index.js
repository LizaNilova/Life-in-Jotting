import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from './routes/auth.js'
import userRouter from './routes/users.js'
import cookieParser from "cookie-parser";
import pagesRouter from './routes/pages.js'

dotenv.config()

const app = express()
const port = 5000
// app.use(cors({ credentials: true, origin: ['http://localhost:9090', 'https://l7h1p7rb-9090.euw.devtunnels.ms/'] }));
app.use(cors({ credentials: true, origin: ['http://localhost:9090'] }));

app.use(express.json())

app.use(cookieParser());

app.use('/life-in-jotting/auth', authRouter)
app.use('/life-in-jotting/users', userRouter)
app.use('/life-in-jotting/notebooks', pagesRouter)

//routes
async function start() {
    try {
        await mongoose.connect(process.env.MONGO)
        app.listen(port, () => { console.log(`Running on port ${port} ...`) })
    } catch (e) {
        console.log(e)
    }
}

start()