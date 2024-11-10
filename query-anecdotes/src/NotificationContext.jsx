import { createContext } from "react"

const NotificationContext = createContext()

export const notificationReducer = (state, action) => {
    switch (action.type) {
      case "VOTE":
        return `anecdote "${action.payload}" voted`
      case "CREATE":
        return `anecdote "${action.payload}" created`
      case "HIDE":
        return ""
      case "ERROR":
        return action.payload
      default:
        return state
    }
  }

export default NotificationContext