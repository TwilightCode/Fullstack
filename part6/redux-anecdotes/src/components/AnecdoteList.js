import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"
import { setmessage } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
        dispatch(setmessage(`you have voted "${anecdotes.find(anecdote => anecdote.id === id).content}"`))
        setTimeout(() => {
            dispatch(setmessage(""))
        }, 5000);
    }

    const sort = () => {
        const sorted = [...anecdotes].sort((a, b) => b["votes"] - a["votes"])
        return sorted
    }

    {
    
        return (
           sort().map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )
        )
    }

}

export default AnecdoteList