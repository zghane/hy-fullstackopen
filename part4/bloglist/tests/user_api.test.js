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

describe("adding a new user", () => {
    test("succeeds, given a fresh (unused) username", async () => {
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

    test("fails when username is already taken", async () => {
        const usersBeforeAddition = await testHelper.usersInDb()

        var newUser = testHelper.initialUsers[0]
        newUser.password = "abc123"

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        const usersAfterAddition = await testHelper.usersInDb()
        expect(usersAfterAddition).toHaveLength(usersBeforeAddition.length)
        expect(usersAfterAddition).toEqual(usersBeforeAddition)
    })

    test("fails when password is too short", async () => {
        const usersBeforeAddition = await testHelper.usersInDb()

        const newUser = { 
            username: "john",
            name: "John Blakes",
            password: "a"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        const usersAfterAddition = await testHelper.usersInDb()
        expect(usersAfterAddition).toHaveLength(usersBeforeAddition.length)
        expect(usersAfterAddition).toEqual(usersBeforeAddition)
    })

    test("fails when password is not given", async () => {
        const usersBeforeAddition = await testHelper.usersInDb()

        const newUser = { 
            username: "john",
            name: "John Blakes",
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        const usersAfterAddition = await testHelper.usersInDb()
        expect(usersAfterAddition).toHaveLength(usersBeforeAddition.length)
        expect(usersAfterAddition).toEqual(usersBeforeAddition)
    })


    test("fails when username is not given", async () => {
        const usersBeforeAddition = await testHelper.usersInDb()

        const newUser = { 
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
    })
