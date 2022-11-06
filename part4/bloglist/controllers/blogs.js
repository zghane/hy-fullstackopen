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

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        const deletedBlog = await Blog.findOneAndRemove({id: request.params.id})
        response.status(204).end()
    }
    catch (error) {
        next(error)
    }
})




module.exports = blogsRouter
