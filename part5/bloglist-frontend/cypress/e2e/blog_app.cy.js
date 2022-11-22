describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3000/api/testing/reset")
        // create a test user
        const user = {
            name: "Test User",
            username: "testuser",
            password: "testtest"
        }
        cy.request("POST", "http://localhost:3000/api/users", user)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("login")

    })

    it("Login succeeds with correct credentials", function()  {
        // make the input fields visible
        cy.contains("login").click()
        cy.get("#inputUsername").type("testuser")
        cy.get("#inputPassword").type("testtest")
        cy.get("#loginButton").click()
        cy.contains("Test User logged in")
    })
    it("Login fails with incorrect credentials", function() {
        cy.contains("login").click()
        cy.get("#inputUsername").type("nonexistent")
        cy.get("#inputPassword").type("password")
        cy.get("#loginButton").click()
        cy.contains("Wrong credentials")
        cy.should("not.contain", "logged in")
    })

    describe("When logged in", function() {
        beforeEach(function() {
            const user = {
                username: "testuser",
                password: "testtest"
            }

            cy.login(user)
        })

        it("A blog can be created", function() {
            const blog = {
                title: "TestTitle",
                author: "TestAuthor",
                url: "https://test.com"
            }
            cy.contains("create new blog").click()
            cy.get("#inputTitle").type(blog.title)
            cy.get("#inputAuthor").type(blog.author)
            cy.get("#inputUrl").type(blog.url)

            cy.get("#createButton").click()

            cy.contains(`${blog.title} ${blog.author}`)

        })
        it("A blog can be liked", function() {
            const blog = {
                title: "TestTitle",
                author: "TestAuthor",
                url: "https://test.com"
            }
            cy.contains("create new blog").click()
            cy.get("#inputTitle").type(blog.title)
            cy.get("#inputAuthor").type(blog.author)
            cy.get("#inputUrl").type(blog.url)

            cy.get("#createButton").click()

            cy.contains(`${blog.title} ${blog.author}`)
            cy.contains("view").click()

            cy.contains("likes 0")
            cy.get("#likeButton").click()
            cy.contains("likes 1") 
        })
        it("A blog can be deleted", function() {
            const blog = {
                title: "TestTitle",
                author: "TestAuthor",
                url: "https://test.com"
            }
            cy.contains("create new blog").click()
            cy.get("#inputTitle").type(blog.title)
            cy.get("#inputAuthor").type(blog.author)
            cy.get("#inputUrl").type(blog.url)

            cy.get("#createButton").click()

            cy.contains(`${blog.title} ${blog.author}`)

            cy.contains("view").click()
            cy.contains("delete").click()

            cy.get("body").should("not.contain", `${blog.title} ${blog.author}`)

        })
        it("Blogs are in descending order by likes", function() {
            // create two test blogs with different amount of likes
            const blog = {
                title: "TestTitle",
                author: "TestAuthor",
                url: "https://test.com",
            }
            const blog2 = {
                title: "TestTitle2",
                author: "TestAuthor2",
                url: "https://test2.com",
            }
            cy.contains("create new blog").click()
            cy.get("#inputTitle").type(blog.title)
            cy.get("#inputAuthor").type(blog.author)
            cy.get("#inputUrl").type(blog.url)
            cy.get("#createButton").click()
            cy.contains(`${blog.title} ${blog.author}`)

            // the form should still be visible
            cy.get("#inputTitle").clear()
            cy.get("#inputAuthor").clear()
            cy.get("#inputUrl").clear()
            cy.get("#inputTitle").type(blog2.title)
            cy.get("#inputAuthor").type(blog2.author)
            cy.get("#inputUrl").type(blog2.url)
            cy.get("#createButton").click()
            cy.contains(`${blog.title} ${blog.author}`)

            // add 1 like to the second blog
            cy.contains(`${blog2.title} ${blog2.author}`).contains("view").click()
            cy.get(".blog").eq(1).find("#likeButton").should("be.visible").click()
            // updating the order takes a while sometimes
            cy.wait(1000)
            cy.get(".blog").eq(0).should("contain", `${blog2.title} ${blog2.author}`)
            cy.get(".blog").eq(1).should("contain", `${blog.title} ${blog.author}`)

        })

    })
})
