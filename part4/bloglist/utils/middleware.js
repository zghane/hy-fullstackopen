const logger = require("./logger")
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method)
    logger.info("Path:  ", request.path)
    logger.info("Body:  ", request.body)
    logger.info("---")
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

// extract jwt token from a request and add it to request.token
const tokenExtractor = (request, response, next) => {
    // token is presented in the authorization header,
    // e.g. Authorization: bearer xxx
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        request.token = authorization.substring(7)
    }
    next()
}
// extract user from a request and add it to request.user
// this should be registered after tokenExtractor
const userExtractor = (request, response, next) => {
    const token = request.token // tokenExtractor should populate this
    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET)
        request.user = decodedToken.id
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    }
    else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "invalid token" })
    }
    else if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "token expired" })
    }

    logger.error(error)
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
