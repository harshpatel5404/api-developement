const image = require("../modules/Image")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })



app.get("/", (req, res) => {
    res.render("index");
})


app.post("/uploadphoto", upload.single('myImage'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        image: Buffer(encode_img, 'base64')
    };
    image.create(final_img, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
})