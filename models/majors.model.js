const mongoose = require('mongoose')

const Majors = new mongoose.Schema(
    {
        name: { type: String, required: true },
        faculty: { type: String, required: true },
    },
    { collection : 'majors-data' }
)

const model = mongoose.model('MajorsData', Majors)

module.exports = model