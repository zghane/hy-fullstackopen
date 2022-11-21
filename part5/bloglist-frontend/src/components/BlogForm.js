import {useState} from "react"
import PropTypes from "prop-types"


const BlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState({title:"",author:"",url:""})

    const handleCreateBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                title
                    <input id="inputTitle" type="text" value={newBlog.title} name="Title" onChange={({target}) => setNewBlog({...newBlog, title: target.value})} />
                </div>
                <div>
                author
                    <input id="inputAuthor" type="text" value={newBlog.author} name="Author" onChange={({target}) => setNewBlog({...newBlog, author: target.value})} />
                </div>
                <div>
                    url
                    <input id="inputUrl" type="text" value={newBlog.url} name="Url" onChange={({target}) => setNewBlog({...newBlog, url: target.value})} />
                </div>
                <button id="createButton" type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}
export default BlogForm

