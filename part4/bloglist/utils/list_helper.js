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
module.exports = {
        dummy,
        totalLikes,
        favoriteBlog,
        formatBlog
}
