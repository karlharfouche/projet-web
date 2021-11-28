const mongoose = require('mongoose')

const Post = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        fees: { type: Number },
        type: { type: String, required: true },
        createdOn: { type: Date, required: true },
        expiryDate: { type: Date, required: true},
    },
    { collection : 'posts-data' }
)

const model = mongoose.model('UserData', Post)

module.exports = model