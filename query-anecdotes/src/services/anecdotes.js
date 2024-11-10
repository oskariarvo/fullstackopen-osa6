import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = anecdote => {
    const newAnec = {
        content: anecdote,
        votes: 0
    }
    return axios.post(baseUrl, newAnec).then(res => res.data)
}

export const updateAnecdote = (anecdote) => {
    const votedAnec = {
        content: anecdote.content,
        votes: anecdote.votes + 1,
        id: anecdote.id
    }
    return axios.put(`${baseUrl}/${anecdote.id}`, votedAnec).then(res => res.data)
}