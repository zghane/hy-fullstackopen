import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import ErrorMessage from "./components/ErrorMessage"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
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

    const loginForm = () => {
        return (
            <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
            <div>
            username
            <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
            </div>
            <div>
            password
            <input type="text" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
            </form>
            </div>
        )
    }
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
    const blogForm = () => {
        return (
            <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
            <div>
            title
            <input type="text" value={newBlog.title} name="Title" onChange={({target}) => setNewBlog({...newBlog, title:target.value})} />
            </div>
            <div>
            author
            <input type="text" value={newBlog.author} name="Author" onChange={({target}) => setNewBlog({...newBlog, author:target.value})} />
            </div>
            <div>
            url
            <input type="text" value={newBlog.url} name="Url" onChange={({target}) => setNewBlog({...newBlog, url:target.value})} />
            </div>
            <button type="submit">create</button>
            </form>
            </div>
        )
    }
    // display error message for time ms
    const displayErrorMessage = (message, time=5000) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage({message: null})
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
            setNewBlog({title: null, author: null, url: null})
            setBlogs(blogs.concat(blog))
            }
        catch (exception) {
            displayErrorMessage("Failed to create the entry")
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
            displayErrorMessage("Wrong credentials")
        }

    }

    // show the login form if the user is not logged in
    // otherwise, show the list of blogs
    return (
        <div>

        <ErrorMessage message={errorMessage} />
        {user === null && loginForm()}
        {user !== null && blogForm()}
        {user !== null && blogsList()}
        </div>
    )
}

export default App
