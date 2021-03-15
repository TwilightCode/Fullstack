import React from 'react'
import {Anecdote, AnecdoteList, CreateNew, About} from '../App'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory, Redirect
} from "react-router-dom"


const Menu = ({ addNew, anecdotes }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/about">about</Link>
        <Link style={padding} to="/new">new</Link>
      </div>
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/anecdotes">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/new">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      </div>
  )
}

export default Menu
