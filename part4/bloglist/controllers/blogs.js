const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

// extract jwt token from a request
const getTokenFrom = request => {
    // token is presented in the authorization header,
    // e.g. Authorization: bearer xxx
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {


    // title and url mandatory
    if (!request.body.title || !request.body.url) {
        response.status(400).end()
    }
    else {
        const token = getTokenFrom(request)
        // check if any token is given
        if (!token) {
            return response.status(401).json({error: "authorization token missing or invalid"})
        }
        // check if given token is valid
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({error: "authorization token missing or invalid"})
        }

        // user corresponding to the token
        const user = await User.findById(decodedToken.id)
        const newBlog = {
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: user.id
        }
        const savedBlog = await new Blog(newBlog).save()
        // add the new blog to the user's list of blogs
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        const deletedBlog = await Blog.findOneAndRemove({id: request.params.id})
        response.status(204).end()
    }
    catch (error) {
        next(error)
    }
})

blogsRouter.put("/:id", async (request, response, next) => {
    try {
        const updatedBlog = {
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes
        }
        const blog = await Blog.findOneAndUpdate({id: request.params.id}, updatedBlog, {new: true, runValidators: true, context: "query"})
        if (blog) {
            response.status(200).json(blog.toJSON())
        }
        else {
            response.status(400).end()
        }
    }
    catch (error) {
        next(error)
    }
})




module.exports = blogsRouter
