const mongoose = require('mongoose')

const trendSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Trend', trendSchema, 'trends')