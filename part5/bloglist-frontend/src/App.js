import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"

import "./index.css"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState("")


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    // get the user"s data from local storage, if available
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedInUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // display message for time ms
    const displayNotification = (message, time=5000) => {
        setNotification(message)
        setTimeout(() => {
            setNotification("")
        }, time)
    }

    const addBlog = async (newBlog) => {
        try {
            const blog = await blogService.create({
                title: newBlog.title,
                author: newBlog.author,
                url: newBlog.url,
            })
            setBlogs(blogs.concat(blog))
            displayNotification(`A new blog "${blog.title}" by ${blog.author} added`)
        }
        catch (exception) {
            displayNotification("Failed to create the entry")
        }
    }
    const updateBlog = async (newBlog) => {
        try {
            const updatedBlog = await blogService.update(
                newBlog.id,
                {title: newBlog.title,
                    author: newBlog.author,
                    url: newBlog.url,
                    likes: newBlog.likes,
                    user: newBlog.user}
            )
            setBlogs(blogs.filter(blog => blog.title !== updatedBlog.title).concat(newBlog))
            displayNotification(`Updated blog "${updatedBlog.title}" details`)
        }
        catch (exception) {
            displayNotification("Failed to update the entry")
        }
    }
    const deleteBlog = async (blog) => {
        try {
            await blogService.remove(blog.id)
            setBlogs(blogs.filter(blogE => blogE.id !== blog.id))
            displayNotification(`Removed blog "${blog.title}" by ${blog.author}`)
        }
        catch (exception) {
            console.log(exception)
            displayNotification("Failed to remove the blog")
        }
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
            // store the user in browser"s local storage so it"s persistent between page reloads
            window.localStorage.setItem("loggedInUser", JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
        }
        catch (exception) {
            displayNotification("Wrong credentials")
        }

    }
    const loginForm = () => {
        return (
            <Togglable buttonLabel="login">
                <LoginForm
                    onSubmit={handleLogin}
                    username={username}
                    password={password}
                    onChangeUsername={({target}) => setUsername(target.value)}
                    onChangePassword={({target}) => setPassword(target.value)}
                />
            </Togglable>
        )
    }

    const blogsForm = () => {
        return (
            <Togglable buttonLabel="create new blog">
                <BlogForm
                    createBlog={addBlog}
                />
            </Togglable>
        )
    }
    // list of blogs
    const blogsList = () => {
        return (
            <div>
                <h2>blogs</h2>
                <p>{user.name} logged in</p>
                {blogs.sort( (blog1,blog2) => blog1.likes > blog2.likes).map(blog =>
                    <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
                )}
            </div>
        )
    }

    // show the login form if the user is not logged in
    // otherwise, show the list of blogs
    return (
        <div>
            {notification !== "" && <Notification message={notification} />}
            {user === null && loginForm()}
            {user !== null && blogsForm()}
            {user !== null && blogsList()}
        </div>
    )
}

export default App
