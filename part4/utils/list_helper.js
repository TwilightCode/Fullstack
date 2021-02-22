const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else {
        var x = 0
        for (i in blogs) {
            x += blogs[i].likes
        }
        return x
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 1) {
        return blogs[0]
    } else {
        var favorite = blogs[0]
        blogs.map((blog) => {
            if (favorite.likes < blog.likes) {
                favorite = blog
            }
        })
        return favorite
    }

}


module.exports = {
    dummy, totalLikes, favoriteBlog
}

