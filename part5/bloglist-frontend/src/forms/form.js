import React from 'react'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>username
        <input
          value={username}

          onChange={handleUsernameChange}
        />
      </div>

      <div>password
        <input
          type="password"
          value={password}

          onChange={handlePasswordChange}
        />
      </div>
      <button type="Submit">login</button>
    </form>

  )
}

const CreateNewBlog = ({
  handleCreation,
  handleTitleChange,
  handleAuthorChange,
  handleUriChange,
  title,
  author,
  url
}) => {
  return (
    <form onSubmit={handleCreation}>
      <div>title
        <input
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>author
        <input
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>url
        <input
          value={url}
          onChange={handleUriChange}
        />
      </div>
      <button type="Submit">create</button>
    </form>
  )
}


export default (LoginForm, CreateNewBlog)
