import { combineReducers } from 'redux'

import exampleReducer from './example/reducer'
import exampleStates from './example/states'
import registerReducer from './register/reducer'
import registerState from './register/states'
import LoginState from './login/states'
import LoginReducer from './login/reducer'
import SearchState from './search/states'
import SearchReducer from './search/reducer'

export interface ApplicationState {
  example: exampleStates,
  register: registerState,
  login: LoginState,
  search : SearchState,
}

export const rootReducer = () =>
  combineReducers({
    example: exampleReducer,
    register: registerReducer,
    login: LoginReducer,
    search: SearchReducer,
  })
