import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from "./services/anecdotes"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import NotificationContext, { notificationReducer } from "./NotificationContext"
import { useReducer } from "react"

// const notificationReducer = (state, action) => {
//   switch (action.type) {
//     case "VOTE":
//       return `anecdote ${action.payload} voted`
//     case "CREATE":
//       return `anecdote ${action.payload} created`
//     default:
//       return state
//   }
// }

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")

  const queryClient = useQueryClient()

  const newVoteAnecdote = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (votedAnec) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      const newAnecs = anecdotes.map(a => a.id !== votedAnec.id ? a : votedAnec)
      queryClient.setQueryData(["anecdotes"], newAnecs)
      notificationDispatch({type: "VOTE", payload: votedAnec.content})
    }
  })

  const handleVote = (anecdote) => {
    console.log(anecdote)
    newVoteAnecdote.mutate(anecdote)
    setTimeout(() => {
      notificationDispatch({type: "HIDE"})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })
  if (result.isLoading) {
    return <div>...is loading</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data


  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
