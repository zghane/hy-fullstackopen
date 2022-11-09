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
    

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
    // display error message for time ms
    const displayErrorMessage = (message, time=5000) => {
            setErrorMessage(message)
            setTimeout(() => {
                    setErrorMessage({message: null})
            }, time)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
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
            {user !== null && blogsList()}
        </div>
    )
}

export default App
