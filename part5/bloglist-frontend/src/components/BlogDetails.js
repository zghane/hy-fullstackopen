// more detailed view of an individual blog entry
//
const BlogDetails = ({blog}) => {
    return (
    <div>
    <p>{blog.title} {blog.author}</p>
    <p>{blog.url}</p>
    <p>likes {blog.likes}<button>like</button></p>
    <p>{blog.user}</p>
    </div>
    )
}


export default BlogDetails
