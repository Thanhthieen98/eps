import { Reducer } from 'redux'
import { Types } from './types'
import States from './states'

const initialState: States = {
  type: '',
  projects: [],
}

const Register: Reducer<States> = (state = initialState, action) => {
  switch (action.type) {
    case Types.SAVE_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      }
    case Types.OT:
      return {
        ...state,
        type: action.type,
      }
    case Types.ONSITE:
      return {
        ...state,
        type: action.type,
      }
    default:
      return state
  }
}

export default Register
