import connectDB from "./config/db.js";
import express from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";

import {router1, router2, router3} from './routes/routes.js';

dotenv.config()
connectDB()

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())

app.use('/api/router1', router1)
app.use('/api/router2', router2)
app.use('/api/router3', router3)

const PORT = process.env.PORT
const IP = process.env.IP

app.listen(
    PORT, IP,
    console.log(
        'Server running in ' + process.env.NODE_ENV + ' mode on ' + PORT
    )
)
