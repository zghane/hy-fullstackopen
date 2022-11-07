const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const testHelper = require("./test_helper")
const api = supertest(app)


// setup data for the tests
beforeEach(async () => {
    // empty the test database
    await Blog.deleteMany({})
    await User.deleteMany({})
    // create some test data in the db
    await User.insertMany(testHelper.initialUsers)
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

describe("adding a blog", () => {
    test("succeeds when logged in and content matches after addition", async () => {
        const userLogin = {
            username: testHelper.initialUsers[0].username,
            password: "dogsandcats"
        }
        const login = await api.post("/api/login")
            .send(userLogin)
            .expect(200)
        const authorizationHeader = `bearer ${login.body.token}`
        const newBlog = {
            title: "Space War",
            author: "Robert C. Martin",
            url: "https://blog.cleancoder.com/uncle-bob/2021/11/28/Spacewar.html",
            likes: 50
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .set("Authorization", authorizationHeader)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogsAfterAddition = await testHelper.blogsInDb()
        const formattedBlogs = blogsAfterAddition.map(blog => {
            return {title: blog.title, author: blog.author, url: blog.url, likes: blog.likes}
        }) 

        expect(blogsAfterAddition).toHaveLength(testHelper.initialBlogs.length + 1)
        expect(formattedBlogs).toContainEqual(newBlog)
    })

    // test that likes always gets a value, by default 0 if not supplied
    test("sets a default value for 'likes' when it's not explicitly set", async () => {
        const userLogin = {
            username: testHelper.initialUsers[0].username,
            password: "dogsandcats"
        }
        const login = await api.post("/api/login")
            .send(userLogin)
            .expect(200)
        const authorizationHeader = `bearer ${login.body.token}`
        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }

        await api
            .post("/api/blogs").send(newBlog)
            .set("Authorization", authorizationHeader)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogsAfterAddition = await testHelper.blogsInDb()
        const addedBlog = await blogsAfterAddition.find(blog => blog.url === newBlog.url)
        expect(addedBlog.likes).toBeDefined()
        expect(addedBlog.likes).toBe(0)
    })

    test("fails if title and url are missing, with 400", async () => {
        const userLogin = {
            username: testHelper.initialUsers[0].username,
            password: "dogsandcats"
        }
        const login = await api.post("/api/login")
            .send(userLogin)
            .expect(200)
        const authorizationHeader = `bearer ${login.body.token}`
        const newBlog = {
            author: "Robert C. Martin",
        }

        await api
            .post("/api/blogs").send(newBlog)
            .set("Authorization", authorizationHeader)
            .expect(400)

        // check that the new blog was not added
        const blogsAfterAddition = await testHelper.blogsInDb()
        expect(blogsAfterAddition).toHaveLength(testHelper.initialBlogs.length)
    })

    test("fails if user is not logged in, with 401", async () => {
        const newBlog = {
            title: "Space War",
            author: "Robert C. Martin",
            url: "https://blog.cleancoder.com/uncle-bob/2021/11/28/Spacewar.html",
            likes: 50
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .expect(401)

        const blogsAfterAddition = await testHelper.blogsInDb()
        const formattedBlogs = blogsAfterAddition.map(blog => {
            return {title: blog.title, author: blog.author, url: blog.url, likes: blog.likes}
        }) 

        expect(blogsAfterAddition).toHaveLength(testHelper.initialBlogs.length)
        expect(formattedBlogs).not.toContainEqual(newBlog)
    })
})

describe("deletion of a blog", () => {
    test("succeeds if user is logged in given a valid blog id and user owns the blog, with 204", async () => {
        const userLogin = {
            username: testHelper.initialUsers[0].username,
            password: "dogsandcats"
        }
        const login = await api.post("/api/login")
            .send(userLogin)
            .expect(200)
        const authorizationHeader = `bearer ${login.body.token}`
        const blogsBeforeDeletion = await testHelper.blogsInDb()

        const blogToDelete = blogsBeforeDeletion[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", authorizationHeader)
            .expect(204)

        const blogsAfterDeletion = await testHelper.blogsInDb()

        expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)
        const titles = blogsAfterDeletion.map(blog => blog.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe("modifying a blog", () => {
    test("succeeds if user is logged in given a valid blog id and user owns the blog, with 200", async () => {
        const userLogin = {
            username: testHelper.initialUsers[0].username,
            password: "dogsandcats"
        }
        const login = await api.post("/api/login")
            .send(userLogin)
            .expect(200)
        const authorizationHeader = `bearer ${login.body.token}`

        const blogsBeforeUpdating = await testHelper.blogsInDb()
        const blogToUpdate = blogsBeforeUpdating[0]
        const updatedBlog = {
            title: "Updated",
            likes: 1990
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog)
            .set("Authorization", authorizationHeader)
            .expect(200)

        const blogsAfterUpdating = await testHelper.blogsInDb()
        const blogs = blogsAfterUpdating.map(blog => {
            return {title: blog.title, likes: blog.likes}
        })

        // length shouldn't have changed
        expect(blogsAfterUpdating).toHaveLength(blogsBeforeUpdating.length)
        expect(blogs).toContainEqual(updatedBlog)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
