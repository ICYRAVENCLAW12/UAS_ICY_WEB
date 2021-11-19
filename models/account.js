const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    number: {
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    bio: {
        type:String,
        required: false
    },
    ImagePath: {
        type: String,
        required: false
    }
    
})

module.exports = mongoose.model('User', userSchema, 'account')