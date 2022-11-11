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
    const [newBlog, setNewBlog] = useState({title: "", author: "", url: ""})


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  
    }, [])

    // get the user's data from local storage, if available
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedInUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // list of blogs
    const blogsList = () => {
        return (
            <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            </div>
        )
    }
    // display message for time ms
    const displayNotification = (message, time=5000) => {
        setNotification(message)
        setTimeout(() => {
            setNotification("")
        }, time)
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        try {
            const blog = await blogService.create({
                title: newBlog.title,
                author: newBlog.author,
                url: newBlog.url,
            })  
            setBlogs(blogs.concat(blog))
            displayNotification(`A new blog "${blog.title}" by ${blog.author} added`)
            setNewBlog({title: "", author: "", url: ""})
            }
        catch (exception) {
            displayNotification("Failed to create the entry")
        }
    }
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
            // store the user in browser's local storage so it's persistent between page reloads
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

    // show the login form if the user is not logged in
    // otherwise, show the list of blogs
    return (
        <div>

        {notification !== "" && <Notification message={notification} />}
        <Togglable buttonLabel="login">
            <LoginForm
                onSubmit={handleLogin}
                username={username}
                password={password}
                onChangeUsername={({target}) => setUsername(target.value)}
                onChangePassword={({target}) => setPassword(target.value)}
        />
        </Togglable>
        {user !== null && 
        <Togglable buttonLabel="create new blog">
            <BlogForm
                newBlog={newBlog}
                onChangeTitle={({target}) => setNewBlog({...newBlog, title: target.value})}
                onChangeAuthor={({target}) => setNewBlog({...newBlog, author: target.value})}
                onChangeUrl={({target}) => setNewBlog({...newBlog, url: target.value})}
                onSubmit={handleCreateBlog}
            />
            </Togglable>
        }
                
        {user !== null && blogsList()}
        </div>
    )
}

export default App
