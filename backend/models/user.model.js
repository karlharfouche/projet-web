const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        faculty: { type: String, required: true },
        major: { type: String, required: true },
        number: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection : 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model