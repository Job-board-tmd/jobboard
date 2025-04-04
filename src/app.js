import express from "express";
import router from "./routes/index.js";
import path from "node:path"
import { fileURLToPath } from 'url';
import { ErrorHandlerMiddleware } from "./middleware/error-handler.middleware.js";
import { BaseException } from "./exception/base.exception.js";
import { join } from "node:path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(join(process.cwd(), "uploads")));


app.use("/api",router)
// app.all("/",(_,res)=>{
//     res.render("menu");
// })
app.all("/*",(req,_,next) => {
    try {
        throw new BaseException(`Given url: ${req.url} and method : ${req.method} not found`,400)
    } catch (error) {
        next(error)
    }
});

app.use(ErrorHandlerMiddleware);

export default app;