import { Reducer } from 'redux'
import state from './states'

const initialState: state = {
  data: [],
}

const Search: Reducer<state> = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default Search
