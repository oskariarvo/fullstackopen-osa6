import { useSelector, useDispatch } from "react-redux"
import anecdoteReducer, { likeAnec } from "../reducers/anecdoteReducer"
import notificationReducer, { voteNotification, hideNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        console.log("filter: ", state.filter)
        return state.anecdotes.filter (a => a.content.includes(state.filter))
    })

    const sortedAnecs = [...anecdotes].toSorted((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    
    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(likeAnec(anecdote))
      }

    return (
        <div>
            {sortedAnecs.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote, anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
)}

export default AnecdoteList