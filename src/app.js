import express from "express";
import router from "./routes/index.js";
import path from "node:path"
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("dirname: ",__filename);

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "public")));

app.use("/api",router)
app.use("/register",(req,res) => {
    res.render("menu")
})
app.all("/*",(req,res) => {
    res.send({
        message:`Given url: ${req.url} and method : ${req.method} not found`
    })
})

export default app;