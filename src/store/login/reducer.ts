import { Reducer } from 'redux'
import State from './states'
import { Types } from './types'

const initialState: State = {
  userInfo: {},
  token: '',
}

const loginReducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOG_IN:
      return {
        userInfo: action.payload.data,
        token: action.payload.data.access_token,
      }
    case Types.LOG_OUT: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default loginReducer
