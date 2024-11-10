import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        hideNotification(state, action) {
            return ""
        },
        addNotification(state, action) {
            return `you ${action.payload.verb} "${action.payload.anecdote}"`
        }
    }
})
export const { voteNotification, hideNotification, addNotification } = notificationSlice.actions

export const setupNotification = (verb, content, time) => {
    return async dispatch => {
        const notificationAnec = {
            verb: verb,
            anecdote: content
        }
        dispatch(addNotification(notificationAnec))
      setTimeout(() => {
          dispatch(hideNotification())
      }, time * 1000)
    }
}

export default notificationSlice.reducer