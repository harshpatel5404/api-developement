const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        require: true,
        type: String,
        unique: true
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String,
    },

},

    {
        timestamps: true,

    }


)


module.exports = mongoose.model("User", userSchema);