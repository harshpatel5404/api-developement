const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const userRouter = require("./routers/user")
const authRouter = require("./routers/auth")
const { default: mongoose } = require('mongoose')
// const image = require("./modules/Image")
const myFile = require("./modules/Image")
const multer = require("multer")
const fs = require("fs")

const port = 3000 || process.env.PORT

dotenv.config()
mongoose.connect(process.env.MONGO_URL,

    {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true

    }
).then(() => console.log("Db Connected!")).catch(() => console.log("Error while db connection"));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);




// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage: storage })


// app.get("/hi", (req, res) => {
//     res.render("index");
// })

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `files/admins-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter,
});

app.post("/api/uploadFile", upload.single("myFile"), async (req, res) => {
    try {
        const newFile = await myFile.create({
            name: req.file.filename,
        });

        // let myfile = new myFile({
        //   name :  req.file.filename,
        // }); 
        // let savedFile = await myfile.save();
       

        res.status(200).json({
            status: "success",
            message: "File created successfully!!",
            save :  newFile
        });
    } catch (error) {
        res.json({ 
            error,
        });
    }
    console.log(req.file);
});


app.get("/api/getFiles", async (req, res) => {
    try {
      const files = await myFile.find();
      res.status(200).json({
        status: "success",
        files,
      });
    } catch (error) {
      res.json({
        status: "Fail",
        error,
      });
    }
  });

// app.post("/uploadphoto", upload.single('myImage'), (req, res) => {
//     var img = fs.readFileSync(req.file.path);
//     var encode_img = img.toString('base64');
//     var final_img = {
//         contentType: req.file.mimetype,
//         image: Buffer(encode_img, 'base64')
//     };
//     image.create(final_img, function (err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result.img.Buffer);
//             console.log("Saved To database");
//             res.contentType(final_img.contentType);
//             res.send(final_img.image);
//         }
//     })
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))