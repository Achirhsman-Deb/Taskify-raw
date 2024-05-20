require("dotenv").config();
const express= require('express');
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const todoRouter = require('./routes/todo');
const auth = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
});

app.use('/api/todo',todoRouter);
app.use('/api/auth',auth);

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "todo-app", "dist")));
    res.sendFile(path.resolve(__dirname, "todo-app","dist","index.html"));
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`server is connected to DB and running on port: ${process.env.PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })

