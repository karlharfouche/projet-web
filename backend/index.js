const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const mongoAtlasUri = 'mongodb+srv://bi:no@cluster0.ldcyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())

try {
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
    );

  } catch (e) {
    console.log("Could not connect");
  }

app.listen(4000, () => {
    console.log("Server started @ port 4000")
})

app.post('/api/users/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            faculty: req.body.faculty,
            major: req.body.major,
            number: req.body.number,
            email: req.body.email, 
            password: newPassword,
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
    })

    if (!user) {
        return res.json({ status: 'error', error: 'invalide login' })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, 'secret123')

        return res.json({ status: 'ok', user: token })
    }


})

app.post('/api/users/profile', async (req, res) => {

    const user = await User.findOne({ 
        email: req.body.email, 
    })

    return res.json({ 
        firstName: user.firstName,
        lastName: user.lastName,
        faculty: user.faculty,
        major: user.major,
        number: user.number,
        email: user.email,
    })
})

app.get('/api/posts', async (req, res) => {

    const token = req.headers['x-acces-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', post: user.post })
    } catch(err) {
        console.log(err)
        res.json({ status: 'error', error: 'invalid token' })
    }
    
})

app.post('/api/posts', async (req, res) => {

    const token = req.headers['x-acces-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne({ email: email }, { $set: { post: req.body.post }})

        return { status: 'ok' }
    } catch(err) {
        console.log(err)
        res.json({ status: 'error', error: 'invalid token' })
    }
    
})

