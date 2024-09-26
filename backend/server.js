import app from "./app.js"
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api: process.env.CLOUDINARY_API_KEY,
    cloud_secret: process.env.CLOUDINARY_API_SECRET,
   
})
app.listen(process.env.PORT,() => {
    console.log(`Server listening on port ${process.env.PORT}`)
});

