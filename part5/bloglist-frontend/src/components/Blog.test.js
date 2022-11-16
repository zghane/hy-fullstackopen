import React from "react"
import "@testing-library/jest-dom/extend-expect"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("Title is rendered", () => {
    const blog = {
        title: "On entropy",
        author: "Jason Higgs",
        url: "www.jhiggs.com",
        likes: 581
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText(blog.title, {exact: false})
    const author = screen.getByText(blog.author, {exact: false})
    expect(title).toBeDefined()
    expect(author).toBeDefined()
})

test("Url and likes are rendered when a blog's 'view' button is clicked", async () => {
    const blog = {
        title: "On entropy",
        author: "Jason Higgs",
        url: "www.jhiggs.com",
        likes: 581
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText("view")

    await user.click(button)
    const url = screen.getByText(blog.url)
    const likes = screen.getByText(blog.likes, {exact: false})

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})

test("clicking the 'like' button twice calls event handler twice", async () => {
    const blog = {
        title: "On entropy",
        author: "Jason Higgs",
        url: "www.jhiggs.com",
        likes: 581
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} updateBlog={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText("like")
    for(var i=0;i<2;i++) await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
