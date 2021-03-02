import { Reducer } from 'redux'
import { Types } from './types'
import States from './states'

const initialState: States = {
  example: null,
}

const ExampleReducer: Reducer<States> = (state = initialState, action) => {
  switch (action.type) {
    case Types.EXAMPLE:
      return {
        ...state,
        example: action.payload,
      }
    default:
      return state
  }
}

export default ExampleReducer
