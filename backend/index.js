const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const mongoAtlasUri = 'mongodb+srv://bi:no@cluster0.ldcyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())

// mongoose.connect('mongodb://localhost:27017/study-buddy')

try {
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }

app.post('/api/users/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            faculty: req.body.faculty,
            major: req.body.major,
            number: req.body.number,
            email: req.body.email, 
            password: req.body.password,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate email'})
    }

})

app.post('/api/users/login', async (req, res) => {
    const user = await User.findOne({ 
        email: req.body.email, 
        password: req.body.password
    })

    if (user) {
        return res.json({ status: 'ok', user: true })
    } else {
        return res.json({ status: 'error', user: false })
    }


})

app.listen(4000, () => {
    console.log("server started @ port 4000")
})