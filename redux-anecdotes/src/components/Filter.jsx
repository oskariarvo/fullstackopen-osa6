import { useDispatch } from "react-redux"
import filterReducer, { filterAnecs } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const theFilter = event.target.value
        console.log("the filter: ", theFilter)
        dispatch({ type: "filter/filterAnecs", payload: theFilter })
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter  <input onChange={handleChange}/>
        </div>
)}

export default Filter