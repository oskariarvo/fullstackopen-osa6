import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: "filter",
    initialState: "",
    reducers: {
        filterAnecs(state, action) {
            return action.payload
        }
    }
})

export const { filterAnecs } = filterSlice.actions
export default filterSlice.reducer