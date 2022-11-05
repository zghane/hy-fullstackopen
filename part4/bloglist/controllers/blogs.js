const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
        const blogs = await Blog.find({})
        response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
        // title and url mandatory
        if (!(request.body.title || request.body.url)) {
                response.status(400).end()
        }
        else {
                const savedBlog = await new Blog(request.body).save()
                response.status(201).json(savedBlog)
        }
})


module.exports = blogsRouter
