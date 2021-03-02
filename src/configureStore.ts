import { Store, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import _ from 'lodash'
import thunk from 'redux-thunk'
import { ApplicationState, rootReducer } from './store'
import { storage } from './utils'

export default function configureStore(): Store<ApplicationState, any> {
  const composeEnhancers = composeWithDevTools({})
  const store = createStore(
    rootReducer(),
    storage.loadState(),
    composeEnhancers(applyMiddleware(thunk)),
  )

  store.subscribe(_.throttle(() => {
    storage.saveState(store.getState())
  }, 1000))

  return store
}
