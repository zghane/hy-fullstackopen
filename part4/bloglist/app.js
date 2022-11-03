const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const blogSchema = mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
})

const Blog = mongoose.model("Blog", blogSchema)

const mongoURI = process.env.MONGODB_URI
console.log("connecting using", mongoURI)
mongoose.connect(mongoURI)

app.use(cors())
app.use(express.json())

app.get("/api/blogs", (request, response) => {
        Blog
                .find({})
                .then(blogs => {
                        response.json(blogs)
                })
})

app.post("/api/blogs", (request, response) => {
        const blog = new Blog(request.body)

        blog
                .save()
                .then(result => {
                        console.log("received ", request.body)
                        response.status(201).json(result)
                })
})


module.exports = app
