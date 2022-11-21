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
    })
