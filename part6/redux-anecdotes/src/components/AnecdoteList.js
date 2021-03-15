import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"
import { setmessage } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
        dispatch(setmessage(`you have voted "${anecdotes.find(anecdote => anecdote.id === id).content}"`))
        setTimeout(() => {
            dispatch(setmessage(""))
        }, 5000);
    }

    const filterAnecdotes = (anecdotes) => {
        const filtered = [...anecdotes].filter((anecdote)=> { return anecdote.content.includes(filter) })
        return filtered
    }
    const sort = (anecdotes) => {
        const sorted = [...anecdotes].sort((a, b) => b["votes"] - a["votes"])
        return sorted
    }

    {
    
        return (
           sort(filterAnecdotes(anecdotes)).map(anecdote =>
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