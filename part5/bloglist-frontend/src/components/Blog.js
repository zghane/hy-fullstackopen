import Togglable from "./Togglable"

const Blog = ({blog, updateBlog}) => {

    // handle clicking the "like" button
    const handleLike = () => {
        const updatedBlog = {...blog, likes: blog.likes + 1}
        updateBlog(updatedBlog)
    }
    // basic view 
    const BlogBasicView = ({blog}) => {
        
    }
    // more detailed view of an individual blog entry
    //
    const BlogDetailsView = ({blog}) => {
        return (
        <>
        <p>{blog.url}</p>
        <p>likes {blog.likes}<button onClick={handleLike}>like</button></p>
        <p>{blog.user}</p>
        </>
        )
    }


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div style={blogStyle}>
        {blog.title} {blog.author}
        <Togglable buttonLabel="view">
            <BlogDetailsView blog={blog}/>
        </Togglable>
        </div>  
    )
}

export default Blog
