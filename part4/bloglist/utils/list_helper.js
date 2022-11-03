const dummy = (blogs) => {
        return 1
}

// count total number of likes, given a list of blogs
const totalLikes = (blogs) => {
        if (blogs && blogs.length > 0) {
                return blogs.map(blog => blog.likes).reduce((sum, item) => {
                        return sum + item
                })
        }
        else {
                return 0
        }
}

// format a blog to show only relevant values
const formatBlog = (blog) => {
        return {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
        }
}

// return the blog with most likes, given a list of blogs
const favoriteBlog = (blogs) => {
        if (blogs && blogs.length > 0) {
                var maxLikes = blogs[0].likes
                var maxLikesBlog = blogs[0]
                for (var i = 0; i < blogs.length; i++) {
                        if (blogs[i].likes > maxLikes) { 
                            maxLikes = blogs[i].likes
                            maxLikesBlog = blogs[i]
                        }
                }
                return formatBlog(maxLikesBlog)
        }
        else {
                return null
        }
}

// return the amount of posts each author has, given a list of blogs
const authorPostCounts = (blogs) => {
        if (blogs && blogs.length > 0) {
                // TODO: a more efficient solution is likely possible
                // this iterates the array way too many times
                //
                // get list of unique authors
                const authors = [... new Set(blogs.map(blog => blog.author))]
                // author and their blog post numbers
                const authorCounts = {}
                for (var i = 0; i < authors.length; i++) {
                    authorCounts[authors[i]] = blogs.filter(blog => blog.author === authors[i]).length
                }
                return authorCounts
                     
        }
        else {
                return null
        }
}

// return the author who has largest amount of blogs, given a list of blogs
const mostBlogs = (blogs) => {
        if (blogs && blogs.length > 0) {
                const postCounts = authorPostCounts(blogs)
                const mostPostsAuthor = Object.keys(postCounts).reduce((author1, author2) => postCounts[author1] > postCounts[author2] ? author1 : author2)
                return {
                        author: mostPostsAuthor,
                        blogs: postCounts[mostPostsAuthor]
                }
        }
        else {
                return null
        }
}
            


module.exports = {
        dummy,
        totalLikes,
        favoriteBlog,
        formatBlog,
        authorPostCounts,
        mostBlogs
}
