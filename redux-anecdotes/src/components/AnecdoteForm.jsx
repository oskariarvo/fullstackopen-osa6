import { useDispatch } from "react-redux"
import anecdoteReducer, { addAnec } from "../reducers/anecdoteReducer"
import notificationReducer, { voteNotification, hideNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdoteToAdd = event.target.anecdote.value
        event.target.anecdote.value = ""
        console.log("anecdote:", anecdoteToAdd)
        dispatch(addAnec(anecdoteToAdd))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
)}

export default AnecdoteForm