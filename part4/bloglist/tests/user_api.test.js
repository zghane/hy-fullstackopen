const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const testHelper = require("./test_helper")
const api = supertest(app)


// setup data for the tests
beforeEach(async () => {
    // empty the test database
    await User.deleteMany({})
    // create some test data in the db
    await User.insertMany(testHelper.initialUsers)
})

test("adding an user succeeds with a fresh username", async () => {
    const usersBeforeAddition = await testHelper.usersInDb()

    const newUser = { 
        username: "john",
        name: "John Blakes",
        password: "abc123"
    }

    await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-type", /application\/json/)

    const usersAfterAddition = await testHelper.usersInDb()
    expect(usersAfterAddition).toHaveLength(usersBeforeAddition.length + 1)
    const usernames = usersAfterAddition.map(user => user.username)
    expect(usernames).toContain(newUser.username)
})

test("adding an user fails when username is already taken", async () => {
    const usersBeforeAddition = await testHelper.usersInDb()

    const newUser = { 
        username: "john",
        name: "John Blakes",
        password: "abc123"
    }

    await api
        .post("/api/users")
        .send(newUser)
        .expect(400)

    const usersAfterAddition = await testHelper.usersInDb()
    expect(usersAfterAddition).toHaveLength(usersBeforeAddition.length)
    expect(usersAfterAddition).toEqual(usersBeforeAddition)
})
