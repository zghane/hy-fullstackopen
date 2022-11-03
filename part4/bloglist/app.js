const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const mongoose = require("mongoose")
const config = require("./utils/config")
const logger = require("./utils/logger")


logger.info("connecting to ", config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

module.exports = app
