const blogRouter = require('express').Router()
const { response } = require('express')
//const { findByIdAndDelete } = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  response.json(blogs)
})

blogRouter.delete('/:id', async (request, response) => {
  // console.log("THIS", request.params.id)
  const removedBlog = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json(removedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog.toJSON())

})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    author: body.author, 
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user.id
  })
  const results = await blog.save()
  user.blogs = user.blogs.concat(results.id)
  await user.save()

  response.json(results)
})

const error = (err) => {
  if (err.name === 'ValidationError') {
    return response.status(400)
  }
}

module.exports = blogRouter
