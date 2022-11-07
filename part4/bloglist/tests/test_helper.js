// test_helper.js
// helper functions for backend tests
const Blog = require("../models/blog")
const User = require("../models/user")

// initial test data
// all blogs owned by user "kate"
const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
        user: "136911ec5b57f1d783cbd24f"
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
        user: "136911ec5b57f1d783cbd24f"

    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
        user: "136911ec5b57f1d783cbd24f"

    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
        user: "136911ec5b57f1d783cbd24f"

    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
        user: "136911ec5b57f1d783cbd24f"

    },
]
const initialUsers = [
    {
        username: "kate",
        name: "Kate Moynes",
        passwordHash: "$2b$10$apA6HwilZWhtyngVwmvJMurVCALkqCwxmnQRwSf5IwLLrVZPO7xfC", // "dogsandcats"
        _id: "136911ec5b57f1d783cbd24f"
    },
    {
        username: "mike",
        name: "Mike Johnson",
        passwordHash: "$2b$10$cpAt.bKAO4lhlN3hhUBzlek/gNPox6e4x.EBZEbsYdpMCMv6Rt21C", //"mysecret"
        _id: "636911ec5b57f1d783cbd24e"
    },
]


// returns list of blogs in the the db
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
// returns list of users in the db
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDb,
    usersInDb
}
