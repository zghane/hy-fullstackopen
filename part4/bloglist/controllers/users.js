const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response, next) => {
    const users = await User.find({})
    response.status(200).json(users)
})
usersRouter.post("/", async (request, response, next) => {
    const {username, name, password} = request.body

    // validate that both username and password are given
    if (!username || !password) {
        return response.status(400).json({
            error: "username and password must be supplied"
        })
    }
    // validate that password is > 3 characters long
    if (password.length <= 3) {
        return response.status(400).json({
            error: "password must be at minimum 3 characters long"
        })
    }
    // check if username already exists
    const existingUser = await User.findOne({username})
    if (existingUser) {
        return response.status(400).json({
            error: "username already exists"
        })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter
