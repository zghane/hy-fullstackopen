const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})
    // check the password hash and if username was supplied
    const passwordCorrect = (user === null)
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "invalid username or password"
        })
    }

    const userInToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userInToken, process.env.JWT_SIGN_SECRET)

    response.status(200).send({
        token: token,
        username: username,
        name: user.name
    })
})

module.exports = loginRouter
