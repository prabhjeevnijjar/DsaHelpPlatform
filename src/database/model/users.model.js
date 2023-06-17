const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profileimage: {
        data: Buffer,
        contentType: String
    },
    blocked: {
        type: Boolean,
        default: false
    },
    role: {
        type:String,
        enum:["admin","user"],
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
