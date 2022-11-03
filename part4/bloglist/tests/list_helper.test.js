const listHelper = require("../utils/list_helper")
const Blog = require("../models/blog")

test("dummy returns one", () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
})

// describe groups tests together
// tests for totalLikes
describe("total likes", () => {
        test("of empty list is zero", () => {
                const blogs = []
                const result = listHelper.totalLikes(blogs)
                expect(result).toBe(0)
        })

        test("when a list has only one blog equals the likes of that", () => {
                const blogs = [
                        new Blog({
                                title: "Blogtitle",
                                author: "Mike",
                                url: "https://mikesblog.wordpress.com",
                                likes: 100
                        })
                ]
                const result = listHelper.totalLikes(blogs)
                expect(result).toBe(100)
        })

        test("of a list of 2 is calculated right", () => {
                const blogs = [
                        new Blog({
                                title: "NaoqponncuNe Mkencasdezo",
                                author: "Asioirnvkas Ksoiwakc",
                                url: "https://awneo0ndovcanoewdf.com",
                                likes: 1000
                        }),
                        new Blog({
                                title: "Qjaonve",
                                author: "Joasnoec",
                                url: "https://qjwonaocnoeroiae.com",
                                likes: 500
                        }),
                ]

                const result = listHelper.totalLikes(blogs)
                expect(result).toBe(1500)
        })

        // redundant
        test("of a bigger list is calculated right", () => {
                const blogs = [
                          new Blog({
                                      _id: "5a422a851b54a676234d17f7",
                                      title: "React patterns",
                                      author: "Michael Chan",
                                      url: "https://reactpatterns.com/",
                                      likes: 7,
                                      __v: 0
                                    }),
                          new Blog({
                                      _id: "5a422aa71b54a676234d17f8",
                                      title: "Go To Statement Considered Harmful",
                                      author: "Edsger W. Dijkstra",
                                      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                                      likes: 5,
                                      __v: 0
                                    }),
                          new Blog({
                                      _id: "5a422b3a1b54a676234d17f9",
                                      title: "Canonical string reduction",
                                      author: "Edsger W. Dijkstra",
                                      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                                      likes: 12,
                                      __v: 0
                                    }),
                          new Blog({
                                      _id: "5a422b891b54a676234d17fa",
                                      title: "First class tests",
                                      author: "Robert C. Martin",
                                      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                                      likes: 10,
                                      __v: 0
                                    }),
                          new Blog({
                                      _id: "5a422ba71b54a676234d17fb",
                                      title: "TDD harms architecture",
                                      author: "Robert C. Martin",
                                      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                                      likes: 0,
                                      __v: 0
                                    }),
                          new Blog({
                                      _id: "5a422bc61b54a676234d17fc",
                                      title: "Type wars",
                                      author: "Robert C. Martin",
                                      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                                      likes: 2,
                                      __v: 0
                                    })  
                ]
                
                const result = listHelper.totalLikes(blogs)
                expect(result).toBe(36)
        })

})

// tests for formatBlog()
test("format blog", () => {
        const blog = new Blog({
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
        })  
        
        const result = listHelper.formatBlog(blog)
        expect(result).toEqual({
                title: "Type wars",
                author: "Robert C. Martin",
                likes: 2
        })
})

// tests for favoriteBlog()
describe("favorite blog", () => {
        test("of empty list", () => {
                const blogs = []
                const result = listHelper.favoriteBlog()
                expect(result).toBe(null)
        })

        test("of a list of length one", () => {
                const blogs = [
                        new Blog({
                                _id: "5a422a851b54a676234d17f7",
                                title: "React patterns",
                                author: "Michael Chan",
                                url: "https://reactpatterns.com/",
                                likes: 7,
                                __v: 0
                        }),
                ]

                const result = listHelper.favoriteBlog(blogs)
                expect(result).toEqual(listHelper.formatBlog(blogs[0]))
        })

        test("of a list of multiple blogs", () => {
                const blogs = [
                          new Blog({
                                      _id: "5a422a851b54a676234d17f7",
                                      title: "React patterns",
                                      author: "Michael Chan",
                                      url: "https://reactpatterns.com/",
                                      likes: 7,
                                      __v: 0
                                    }),
                          new Blog({
                                      _id: "5a422aa71b54a676234d17f8",
                                      title: "Go To Statement Considered Harmful",
                                      author: "Edsger W. Dijkstra",
                                      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                                      likes: 5,
                                      __v: 0
                                    }),
                          new Blog({
                                      _id: "5a422b3a1b54a676234d17f9",
                                      title: "Canonical string reduction",
                                      author: "Edsger W. Dijkstra",
                                      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                                      likes: 12,
                                      __v: 0
                                    }),
                ]

                const result = listHelper.favoriteBlog(blogs)
                expect(result).toEqual(listHelper.formatBlog(blogs[2]))
        })
})
