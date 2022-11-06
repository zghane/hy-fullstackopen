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

// test that likes always gets a value, by default 0 if not supplied
test("an added blog has default value for likes", async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }

    await api
        .post("/api/blogs").send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const blogsAfterAddition = await testHelper.blogsInDb()
    const addedBlog = await blogsAfterAddition.find(blog => blog.url === newBlog.url)
    expect(addedBlog.likes).toBeDefined()
    expect(addedBlog.likes).toBe(0)
})

test("add a new blog  with missing title and url requests in 400 BAD REQUEST", async () => {
    const newBlog = {
        author: "Robert C. Martin",
    }

    await api
        .post("/api/blogs").send(newBlog)
        .expect(400)

    // check that the new blog was not added
    const blogsAfterAddition = await testHelper.blogsInDb()
    expect(blogsAfterAddition).toHaveLength(testHelper.initialBlogs.length)
})
describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
        const blogsBeforeDeletion = await testHelper.blogsInDb()
        const blogToDelete = blogsBeforeDeletion[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAfterDeletion = await testHelper.blogsInDb()

        expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)
        const titles = blogsAfterDeletion.map(blog => blog.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
