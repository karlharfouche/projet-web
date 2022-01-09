const mongoose = require('mongoose')

const Feedback = new mongoose.Schema(
    {
        author: { type: String, required: true },
        feedback: { type: String, required: true },
        rating: { type: Number, required: true },
        concerned: { type: String, required: true },
    },
    { collection : 'feedback-data' }
)

const model = mongoose.model('FeedbackData', Feedback)

module.exports = model