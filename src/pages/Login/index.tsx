import React, { FunctionComponent, useState } from 'react'
import {
  Typography, Form, Input, Button, message,
} from 'antd'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionLogin, actionSaveInfo } from '../../store/login/actions'
import { actionGetAllProject } from '../../store/register/actions'

// config ant design
const { Title } = Typography

// render
const Login: FunctionComponent = () => {
  const [disable, setDisable] = useState(false)

  const dispatch = useDispatch()

  const onFinish = async (values: any) => {
    setDisable(true)
    message.loading({
      content: 'loading...',
      key: 1,
      duration: 0,
    })
    const response: any = await dispatch(actionLogin(values))
    if (response?.status === 200) {
      message.destroy(1)
      dispatch(actionSaveInfo(response))
      await dispatch(actionGetAllProject())
    } else {
      message.destroy(1)
      message.error(response.message)
    }
    setDisable(false)
  }
  return (
    <div className="login">
      <div className="container">
        <Title level={2}>ĐĂNG NHẬP</Title>
        <div>
          <Form
            name="basic"
            layout="vertical"
            requiredMark={false}
            size="large"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Tên đăng nhập"
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={disable} block>
                Đăng nhập
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/forgot-password">Quên mật khẩu</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
