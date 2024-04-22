import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import UserRouter from "./routes/User.route.js"
import PropertyRouter from "./routes/Property.routes.js"

const app = express();


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))

app.use("/api/v1/user", UserRouter);

app.use("/api/v1/property", PropertyRouter);

export {app};

