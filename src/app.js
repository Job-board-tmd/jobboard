import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api",router)

app.all("/*",(req,res)=>{
    res.send({
        message:`Given url: ${req.url} and method : ${req.method} not found`
    })
})

export default app;