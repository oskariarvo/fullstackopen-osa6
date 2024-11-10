import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdotes"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnec) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnec))
      dispatch({type: "CREATE", payload: newAnec.content})
    },
    onError: () => {
      dispatch({type: "ERROR", payload: "too short anecdote, must have length 5 or more"})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    newAnecMutation.mutate(content)
    setTimeout(() => {
      dispatch({type: "HIDE"})
    }, 5000)

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
