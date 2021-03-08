import React from 'react'
import { newAnecdote } from "../reducers/anecdoteReducer"
import {useDispatch} from "react-redux"
import {setmessage} from "../reducers/notificationReducer"
const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const createNewAnecdote = (event) => {
        event.preventDefault()
      
        const t = event.target
        const content = t.anecdote.value
        t.anecdote.value = ''
        console.log('anecdote', content)
        dispatch(newAnecdote(content))
        dispatch(setmessage("new message"))
        setTimeout(() => {
            dispatch(setmessage(""))
        }, 5000);

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>)
}

export default AnecdoteForm