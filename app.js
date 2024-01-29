const express = require("express");
const cors = require("cors");
const singerRouter = require("./routes/singer");
const songRouter = require("./routes/song");
const albumRouter = require("./routes/album");
const userRouter = require("./routes/user")
require('dotenv').config();

const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function main(){
    await mongoose.connect(process.env.MONGO_CNN);
    console.log('Database conectec');
}
main().catch((err)=> console.log(err));

app.use(cors());
app.use(express.json());

app.use('/song', songRouter);
app.use('/singer', singerRouter);
app.use('/album', albumRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor en funcionamiento en el puerto ${process.env.PORT}`)
})