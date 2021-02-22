const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const { response } = require('express')
//const { findByIdAndDelete } = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  response.json(blogs)
})

const getTokenFrom = request => {

  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}



blogRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  //console.log(token, '====', process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  var user = 0 
 // console.log('decodedid: ', decodedToken.id)
  const t = await User.findById(decodedToken.id)
  if (!t) {
    user = new User({username:"lllll"})
  } else {
    user = t
  }
if(body.title === undefined || body.url === undefined){
  return response.status(400).json({ error: 'content missing' })
} 

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user.id
  })

  const results = await blog.save()
  //if (!user) console.log("no user!!!!!");
  //if (!user.blogs) console.log("no blogs!!!!!");
  user.blogs = user.blogs.concat(results.id)

  await user.save()

  response.json(results)
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


blogRouter.delete('/:id', async (request, response) => {

  const removedBlog = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json(removedBlog)
})


module.exports = blogRouter
