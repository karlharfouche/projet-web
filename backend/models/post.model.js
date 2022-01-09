const mongoose = require('mongoose')

let created = new Date()


const Post = new mongoose.Schema(
    {
        author: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        fees: { type: Number },
        type: { type: String, required: true },
        createdOn: { type: Date, required: true, default: new Date() },
        expiryDate: { type: Date, required: true, default: new Date().setMonth(created.getMonth() + 1) },

    },
    { collection : 'posts-data' }
)

const model = mongoose.model('PostsData', Post)

module.exports = model