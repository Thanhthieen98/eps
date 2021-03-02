import React, { FunctionComponent } from 'react'
import './styles.scss'
import { Menu, Dropdown, Avatar } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { actionLogOut } from '../../store/login/actions'
import { ApplicationState } from '../../store'

export interface Props {
  name: string
  btnBack: boolean
}

const Header: FunctionComponent<Props> = ({ name, btnBack }) => {
  // state
  const avatar = useSelector((state : ApplicationState) => state.login.userInfo.name.split(' ').pop().toUpperCase())
  // dispatch
  const dispatch = useDispatch()
  // history
  const history = useHistory()

  function LogOut() {
    dispatch(actionLogOut())
  }

  function redirectProfile() {
    history.push('/profile')
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={redirectProfile}>Trang cá nhân</Menu.Item>
      <Menu.Item key="2" onClick={() => history.push('/change-password', { remove: true })}>Đổi mật khẩu</Menu.Item>
      <Menu.Item key="3" onClick={LogOut}>Thoát</Menu.Item>
    </Menu>
  )
  return (
    <div className="header">
      <div className="header--content">
        {
        /* eslint-disable */
        btnBack
          ? (
            <a style={{ color: 'black' }} onClick={() => history.goBack()}>
              <p>
                <span>
                  <LeftOutlined />
                </span>

                {name}
              </p>
            </a>
          )
          : (
            <p style={{ color: 'black' }}>{name}</p>
          )
}
        <Dropdown trigger={['hover', 'click']} overlay={menu}>
          <Avatar><a style={{ color: 'white' }}>{avatar.charAt(0)}</a></Avatar>
        </Dropdown>
      </div>
      <hr />
    </div>
  )
}
/* eslint-disable */
export default Header
