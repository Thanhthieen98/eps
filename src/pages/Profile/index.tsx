import React, { FunctionComponent } from 'react'
import {
  Route, Switch, useRouteMatch, withRouter,
} from 'react-router'
import information from './information'
import saveInfo from './saveInfo'
import saveBankInfo from './saveBankInfo'

export interface Props{
}

const Profile: FunctionComponent<Props> = () => {
  const match = useRouteMatch()
  return (

    <Switch>
      <Route path={`${match.path}/save-info`} component={saveInfo} />
      <Route path={`${match.path}/save-bank-info`} component={saveBankInfo} />
      <Route path={`${match.path}`} component={information} />
    </Switch>
  )
}

export default withRouter(Profile)
