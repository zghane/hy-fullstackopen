const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: {
                type: Number,
                default: 0
        }
})

// rename the returned objects _id to id
blogSchema.set('toJSON', {
          transform: (document, returnedObject) => {
                      returnedObject.id = returnedObject._id.toString()
                      delete returnedObject._id
                    }
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog
