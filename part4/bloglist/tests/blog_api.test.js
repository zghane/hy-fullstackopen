const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const testHelper = require("./test_helper")
const api = supertest(app)


// setup data for the tests
beforeEach(async () => {
        // empty the test database
        await Blog.deleteMany({})
        // create some test data in the db
        await Blog.insertMany(testHelper.initialBlogs)
})

// test content-type is correct
test("blog list is returned as json", async () => {
        await api.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

// test api returns all items in the db
test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs")

        expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})

// test that each blog post has an id
test("blog posts have an id", async () => {
        const response = await api.get("/api/blogs")
        
        for (var i = 0; i < response.body.length; i++) {
                expect(response.body[i].id).toBeDefined()
        }
})

test("a blog can be added and content matches after addition", async () => {
        const newBlog = {
                title: "Space War",
                author: "Robert C. Martin",
                url: "https://blog.cleancoder.com/uncle-bob/2021/11/28/Spacewar.html",
                likes: 50
        }
        
        await api.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

        // note: has to await here (inside the function does not work)
        const blogsAfterAddition = await testHelper.blogsInDb()
        const formattedBlogs = blogsAfterAddition.map(blog => {
                return {title: blog.title, author: blog.author, url: blog.url, likes: blog.likes}
        }) 

        expect(blogsAfterAddition).toHaveLength(testHelper.initialBlogs.length + 1)
        expect(formattedBlogs).toContainEqual(newBlog)
})

afterAll(() => {
        mongoose.connection.close()
})
