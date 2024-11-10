import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes"
import { setupNotification } from "./notificationReducer"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    changeAnec(state, action) {
      return state.map(a => a.id !== action.payload.id ? a : action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { changeAnec, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const addAnec = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(setupNotification("created", newAnecdote.content, 5))
  }
}
export const likeAnec = anecdote => {
  return async dispatch => {
    const likedAnec = { ...anecdote, votes: anecdote.votes + 1 }
    const pushedAnec = await anecdoteService.update(anecdote.id, likedAnec)
    dispatch(changeAnec(pushedAnec))
    dispatch(setupNotification("liked", pushedAnec.content, 5))
  }
}


export default anecdoteSlice.reducer