const userRouter = require('express').Router()
const { response } = require('express')
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes')
    response.json(users)
})


userRouter.post('/', async (request, response) => {
    body = request.body
    if (body.name === undefined || body.username === undefined || body.password === undefined) {
        return response.status(400).json({ error: 'content missing' })
    } else if (body.username.length < 4 || body.password.length < 4) {
        return response.status(400).json({ error: 'both password and username must be longer than 3 characters' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = userRouter