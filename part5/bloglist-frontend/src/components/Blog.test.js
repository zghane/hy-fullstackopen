import React from "react"
import "@testing-library/jest-dom/extend-expect"
import {render, screen} from "@testing-library/react"
import Blog from "./Blog"

test("Title is rendered", () => {
    const blog = {
        title: "On entropy",
        author: "Jason Higgs",
        url: "www.jhiggs.com",
        likes: 0
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText(blog.title, {exact: false})
    const author = screen.getByText(blog.author, {exact: false})
    expect(title).toBeDefined()
    expect(author).toBeDefined()
})

