const mongoose = require('mongoose')


var imgSchema = mongoose.Schema({
    img:{data:Buffer,contentType: String}
});



// Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({
   
name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
},
});
const myFile = mongoose.model("File", fileSchema);
module.exports = myFile;
// module.exports = mongoose.model("image",imgSchema);