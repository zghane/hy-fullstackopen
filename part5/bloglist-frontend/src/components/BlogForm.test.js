import React from "react"
import "@testing-library/jest-dom/extend-expect"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("Check that callback for creating a blog is called properly", async () => {
    const blog = {
        title: "On entropy",
        author: "Jason Higgs",
        url: "www.jhiggs.com",
        likes: 581
    }

    const createHandler = jest.fn()
    const user = userEvent.setup()

    const component = render(<BlogForm createBlog={createHandler} />)

    const titleInput = component.container.querySelector("#inputTitle")
    const authorInput = component.container.querySelector("#inputAuthor") 
    const urlInput = component.container.querySelector("#inputUrl") 
    const createButton = screen.getByText("create")

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(createButton)

    expect(createHandler.mock.calls).toHaveLength(1)
    expect(createHandler.mock.calls[0][0].title).toBe(blog.title)
    expect(createHandler.mock.calls[0][0].author).toBe(blog.author)
    expect(createHandler.mock.calls[0][0].url).toBe(blog.url)


})
