// const express = require('express')
// const app = express()
// const dotenv = require("dotenv")
// const cors = require("cors")
// const userRouter = require("./routers/user")
// const authRouter = require("./routers/auth")
// const { default: mongoose } = require('mongoose')
// // const image = require("./modules/Image")
// const myFile = require("./modules/Image")
// const multer = require("multer")
// const fs = require("fs")

// const port = process.env.PORT || 3000

// dotenv.config()
// mongoose.connect("mongodb+srv://harsh5404:har5404@cluster0.kmphfal.mongodb.net/?retryWrites=true&w=majority",
// // mongoose.connect(process.env.MONGO_URL,

//     {
//         keepAlive: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true

//     }
// ).then(() => console.log("Db Connected!")).catch(() => console.log("Error while db connection"));
// app.use(cors());
// app.use(express.json());
// app.get("/", (req,res)=> res.send("hellos woe!"));
// app.use("/api/auth", authRouter);

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public");
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split("/")[1];
//         cb(null, `files/admins-${file.fieldname}-${Date.now()}.${ext}`);
//     },
// });

// const upload = multer({
//     storage: multerStorage,
//     // fileFilter: multerFilter,
// });

// app.post("/api/uploadFile", upload.single("myFile"), async (req, res) => {
//     try {
//         const newFile = await myFile.create({
//             name: req.file.filename,
//         });
//        res.status(200).json({
//             status: "success",
//             message: "File created successfully!!",
//             save: newFile
//         });
//     } catch (error) {
//         res.json({
//             error,
//         });
//     }
//     console.log(req.file);
// });


// app.get("/api/getFiles", async (req, res) => {
//     try {
//         const files = await myFile.find();
//         res.status(200).json({
//             status: "success",
//             files,
//         });
//     } catch (error) {
//         res.json({
//             status: "Fail",
//             error,
//         });
//     }
// });
 
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");

// INIT
const PORT = process.env.PORT || 3000;
const app = express();
const DB =
  "mongodb+srv://harshvora:harshpatel98@cluster0.wkulyrj.mongodb.net/?retryWrites=true&w=majority";
  
// middleware
app.use(express.json());

// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });


app.get("/", (req,res) => res.send("testing...."));

app.listen(PORT, () => {
  console.log(`connected at port ${PORT}`);
});