const mongoose = require('mongoose')

const Faculties = new mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    { collection : 'faculties-data' }
)

const model = mongoose.model('FacultiesData', Faculties)

module.exports = model