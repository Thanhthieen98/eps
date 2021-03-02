import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import {
  ChangePassword, Home, Login, RegisterWork, Search, MyCalendar, ForgotPassword, Profile,
} from './pages'
import { ApplicationState } from './store'

export interface Props {}

const Routes: FunctionComponent<Props> = () => {
  const token = useSelector((state: ApplicationState) => state.login.token)
  const { is_reset } = useSelector((state: ApplicationState) => state.login.userInfo)

  if (token) {
    return (
      <>
        {!is_reset ? (
          <Switch>
            <Route exact path="/change-password" component={ChangePassword} />
            <Redirect to="/change-password" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/register" component={RegisterWork} />
            <Route exact path="/my-calendar" component={MyCalendar} />
            <Route exact path="/change-password" component={ChangePassword} />
            <Route path="/profile" component={Profile} />
            <Redirect to="/" />
          </Switch>
        )}
      </>
    )
  }
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/forgot-password/:token" component={ForgotPassword} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Redirect to="/login" />
    </Switch>
  )
}

export default Routes
