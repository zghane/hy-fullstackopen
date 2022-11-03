const dummy = (blogs) => {
        return 1
}

// count total number of likes for list of blogs
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

module.exports = {
        dummy,
        totalLikes
}
