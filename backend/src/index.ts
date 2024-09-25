import  express, { Request, Response}  from "express";
import cors from "cors";
import "dotenv/config"
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import fileUpLoad from "express-fileupload"
import cloudinary from "cloudinary"
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("Connected to database!"));

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(express.urlencoded({ extended: true}))

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.get("/test", async (req: Request, res: Response) => {
    res.json({ message : "Hello!" })
})

app.listen(7000, () => {
    console.log("server started on localhost:7000")
})
