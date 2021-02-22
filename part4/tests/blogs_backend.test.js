const { response, urlencoded } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/testerHelper')
const api = supertest(app)

const initialBlogs =
    [
        {
            title: "K",
            author: "M",
            url: "s",
            likes: 0
        },
        {
            title: "L",
            author: "D",
            url: "S",
            likes: 1
        },
    ]

const initialUsers =
    [
        {
            username: "Kaaaaa",
            name: "rrarar",
            password: "dlaöld",
            id: 1
        },
        {
            username: "Laaaaa",
            name: "laalla",
            password: "mfölamöfm",
            id: 0
        },
    ]



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

describe('posting blogs', () => {

    test('New blog is added correctly', async () => {
        const newBlog = {
            title: "new",
            author: "new Author",
            url: "some address",
            likes: 6

        }
        const result = (await api.post('/api/blogs').send(newBlog).set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhYWEiLCJpZCI6IjYwMzQxNTEwODY0Y2M2ZDhjMTY1MGQzOSIsImlhdCI6MTYxNDAyNjAzOX0.wONt4qpppzWW1EopA-NU_EZzrUOxU9i-o1dAwuIma9c')).body

        expect(result.title).toEqual(newBlog.title)
        expect(result.author).toEqual(newBlog.author)
        expect(result.url).toEqual(newBlog.url)
        expect(result.likes).toEqual(newBlog.likes)
        const amount = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
        expect(amount.body).toHaveLength(initialBlogs.length + 1)
    })

    test('Correct amount of blogs are returned', async () => {
        const results = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
        expect(results.body).toHaveLength(initialBlogs.length)
    })

    test('Amount of likes defaults to zero', async () => {
        const newBlog = {
            title: "new",
            author: "new Author",
            url: "some address",

        }
        const result = (await api.post('/api/blogs').send(newBlog).set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhYWEiLCJpZCI6IjYwMzQxNTEwODY0Y2M2ZDhjMTY1MGQzOSIsImlhdCI6MTYxNDAyNjAzOX0.wONt4qpppzWW1EopA-NU_EZzrUOxU9i-o1dAwuIma9c')).body
        expect(result.likes).toEqual(0)
    })

    test('Correct respond to badly formed blog entity', async () => {
        const newBlog = {

            author: "new Author",
            likes: 0

        }
        await (api.post('/api/blogs').send(newBlog).set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhYWEiLCJpZCI6IjYwMzQxNTEwODY0Y2M2ZDhjMTY1MGQzOSIsImlhdCI6MTYxNDAyNjAzOX0.wONt4qpppzWW1EopA-NU_EZzrUOxU9i-o1dAwuIma9c')).expect(400)

    })

    test('Id is named correctly', async () => {
        const result = (await api.get('/api/blogs')).body
        expect(result[0].id).toBeDefined()
    })

    test(' blog is destroyed', async () => {
        const newBlog = {
            title: "new",
            author: "new Author",
            url: "some address",
            likes: 6
        }
        const result = (await api.post('/api/blogs').send(newBlog).set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhYWEiLCJpZCI6IjYwMzQxNTEwODY0Y2M2ZDhjMTY1MGQzOSIsImlhdCI6MTYxNDAyNjAzOX0.wONt4qpppzWW1EopA-NU_EZzrUOxU9i-o1dAwuIma9c')).body
        var amount = await api.get('/api/blogs')
        expect(amount.body).toHaveLength(initialBlogs.length + 1)

        await api.delete(`/api/blogs/${result.id}`).set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhYWEiLCJpZCI6IjYwMzQxNTEwODY0Y2M2ZDhjMTY1MGQzOSIsImlhdCI6MTYxNDAyNjAzOX0.wONt4qpppzWW1EopA-NU_EZzrUOxU9i-o1dAwuIma9c')
        amount = await api.get('/api/blogs')
        expect(amount.body).toHaveLength(initialBlogs.length)

    })

  
})




describe('posting users', () => {
    test('works if proper user is given', async () => {
        const newPerson = {
            username: 'samR',
            name: 'sam raimi',
            password: 't2g4h6'
        }
        await api.post('/api/users').send(newPerson)
        const results = (await api.get('/api/users')).body

        expect(results).toHaveLength(initialUsers.length+1)
    })

    test('invalid user cannot be created', async () => {
        const newPerson = {
            name: 'sam raimi',
            password: 't2g4h6'
        }

        const newPerson2 = {
            username: 'samR',
            password: 't2g4h6'
        }

        const newPerson3 = {
            username: 'samR',
            name: 'samra raimi'
        }

        await api.post('/api/users').send(newPerson).expect(400)
        await api.post('/api/users').send(newPerson2).expect(400)
        await api.post('/api/users').send(newPerson3).expect(400)
        const results = (await api.get('/api/users')).body

        expect(results).toHaveLength(initialUsers.length)
    })

    test('length is correct', async () => {
        const newPerson = {
            name: 'sa',
            username: 'sa',
            password: 't2g4h6'
        }

        const newPerson2 = {
            username: 'samR',
            password: 't2'
        }


        await api.post('/api/users').send(newPerson).expect(400).set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhYWEiLCJpZCI6IjYwMzQxNTEwODY0Y2M2ZDhjMTY1MGQzOSIsImlhdCI6MTYxNDAyNjAzOX0.wONt4qpppzWW1EopA-NU_EZzrUOxU9i-o1dAwuIma9c')
        await api.post('/api/users').send(newPerson2).expect(400).set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhYWEiLCJpZCI6IjYwMzQxNTEwODY0Y2M2ZDhjMTY1MGQzOSIsImlhdCI6MTYxNDAyNjAzOX0.wONt4qpppzWW1EopA-NU_EZzrUOxU9i-o1dAwuIma9c')
        const results = (await api.get('/api/users')).body

        expect(results).toHaveLength(initialUsers.length)
    })

})

afterAll(() => {
    mongoose.connection.close()
})