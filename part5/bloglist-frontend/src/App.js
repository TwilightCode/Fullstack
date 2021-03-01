import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './utils/notice'
import LoginForm from './forms/form'
import CreateNewBlog from './forms/form'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUri] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)



  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
    showMessage('confirm', 'you have logged out')
  }

  const showMessage = (type, information) => {
    //console.log("This is info = ",info)
    {
      setMessage(information)
      setMessageType(type)
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const person = {
      username: username,
      password: password
    }
    try {
      const user = await loginService.login({
        person: person
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('error', 'wrong credentials')
    }
  }

  const handleCreation = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,

    }
    try {
      const blog = await blogService.create({
        newBlog: newBlog

      })
      showMessage('confirm', 'created new blog')
      setBlogs(blogs.concat(blog))
    } catch (exception) {
      showMessage('error', 'missing title, author or url')
    }
    console.log(newBlog)
  }


  const logout = () => (
    <div>
      <button onClick={logOut}>log out</button>

    </div>

  )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const createNewBlog = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateNewBlog
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUriChange={({ target }) => setUri(target.value)}
            handleCreation={handleCreation}
          />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }



  return (

    <div>
      <Notification message={message} type={messageType} />
      {user === null ?
        loginForm() :
        <div>

          <p>{user.name} logged in</p>
          {logout()}
          {createNewBlog()}
          <h1>Blogs</h1>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App