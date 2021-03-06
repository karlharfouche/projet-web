const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Post = require('./models/post.model')
const Feedback = require('./models/feedback.model')
const Faculties = require('./models/faculties.model')
const Majors = require('./models/majors.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require("path")
require("dotenv").config()

const mongoAtlasUri = 'mongodb+srv://bi:no@cluster0.ldcyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "frontend", "build")))

try {
    mongoose.connect(
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose is connected")
    );
} catch (e) {
    console.log("Could not connect");
}

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

app.post('/api/posts/add', async (req, res) => {
    console.log(req.body)

    await Post.create({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        fees: req.body.fees,
        type: req.body.type,
        createdOn: req.body.createdOn,
        expiryDate: req.body.expiryDate,
    })
    res.json({ status: 'ok' })
})

app.get('/api/posts/get', async (req, res) => {
    Post.find({}, (err, doc) => {
        res.send(doc)
    })
})

app.post('/api/feedback/add', async (req, res) => {
    console.log(req.body)

    await Feedback.create({
        author: req.body.author,
        feedback: req.body.feedback,
        rating: req.body.rating,
        concerned: req.body.concerned,
    })

    res.json({ status: 'ok' })
})

app.get('/api/feedback/get', async (req, res) => {
    Feedback.find({}, (err, doc) => {
        res.send(doc)
    })
})

app.get('/api/faculties/get', async (req, res) => {
    Faculties.find({}, (err, doc) => {
        res.send(doc)
    })
})

app.get('/api/majors/get', async (req, res) => {
    Majors.find({}, (err, doc) => {
        res.send(doc)
    })
})

app.post('/api/posts/delete/exp', async (req, res) => {

    Post.deleteMany( { expiryDate: { $lte: new Date() } }, function(err, obj) {
        if (err) throw err
      }) 
    return res.json({ status: 'ok' })
})

app.post('/api/posts/delete/userDel', async (req, res) => {

    Post.deleteMany( { _id: req.body._id }, function(err, obj) {
        if (err) throw err
      }) 
    return res.json({ status: 'ok' })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(port, () => {
    console.log("Server started @ port 4000")
})