import userRoutes from "./routes"
import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import expressValidator from "express-validator"
import bodyParser from "body-parser";

//const dotenv = require("dotenv");

export const app: Express = express()

//dotenv.config();

const ud : string = "mongodb+srv://teaparty_jose:DnGTkqGcxQtpr7TA@cluster0.fsdna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(ud, {
        useNewUrlParser: true,  useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

//const app: Express = express()

//const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(userRoutes);
//app.use(expressValidator());

//const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.fsdna.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
//const options = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(function(err:any, req:any, res:any, next:any) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});