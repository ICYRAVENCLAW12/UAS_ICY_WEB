const mongoose = require('mongoose')

const followmeSchema = mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('FollowMe', followmeSchema, 'followme')