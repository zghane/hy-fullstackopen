const BlogForm = ({newBlog, onSubmit, onChangeTitle, onChangeAuthor, onChangeUrl}) => {
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={onSubmit}>
        <div>
        title
        <input type="text" value={newBlog.title} name="Title" onChange={onChangeTitle} />
        </div>
        <div>
        author
        <input type="text" value={newBlog.author} name="Author" onChange={onChangeAuthor} />
        </div>
        <div>
        url
        <input type="text" value={newBlog.url} name="Url" onChange={onChangeUrl} />
        </div>
        <button type="submit">create</button>
        </form>
        </div>
    )
}

export default BlogForm

