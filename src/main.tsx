import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './configureStore'
import Routes from './routes'
import './styles/main.scss'

interface MainProps { }

const Main: React.FC<MainProps> = () => {
  const store = configureStore()
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  )
}

export default Main
