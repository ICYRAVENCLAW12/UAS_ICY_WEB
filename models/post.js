const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required:true
    },
    Username_pic: {
        type: String,
        require: false
    },
    modalImagePath: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('post', productSchema, 'POST_DATABASE')