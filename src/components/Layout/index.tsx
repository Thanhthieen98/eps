import React, { FunctionComponent } from 'react'
import './styles.scss'
import { Header, Add } from '..'

export interface Props {
  name: string
  btn?: boolean,
  btnBack?: boolean,
}

const Layout: FunctionComponent<Props> = ({
  name, children, btn = true, btnBack = true,
}) => (
  <div className="layout">
    <Header name={name} btnBack={btnBack} />
    <div className="container">{children}</div>
    {btn && <Add name={name} />}
  </div>
)

export default Layout
