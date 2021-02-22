const { favoriteBlog } = require('../utils/list_helper')
const listHelper = require('../utils/list_helper')
const _ = require('lodash')


const listWithNoBlog = []

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7,
        __v: 0
    }
]



const listWithManyBlogs = [
    {
        _id: 'msadlmaadmam11314',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Considered_Harmful.html',
        likes: 3,
        __v: 0
    },
    {
        _id: '12345678asndkland',
        title: 'No return',
        author: 'Studious D',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/No_return.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Maps are fundamentally important',
        author: 'Leonard Bracket',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Maps_are_fundamentally_important.html',
        likes: 7,
        __v: 0
    }
]



test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
//Total likes tests
describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(listWithNoBlog)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(7)
    })

    test('when list has many blogs, amount of likes is calculated correctly', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(22)
    })
})
//Favourite Blog tests
describe('favorite Blog', () => {
    test('returns correct favorite blog', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        expect(result).toEqual(listWithManyBlogs[1])
    })

    test('when list has only one blog, returns it', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })
})