import React, { FunctionComponent, useState } from 'react'
import {
  Typography, Form, Input, Button, message,
} from 'antd'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { actionChangePassword, actionLogOut } from '../../store/login/actions'
import { ApplicationState } from '../../store'

// config ant design
const { Title } = Typography

// render
const ChangePassword: FunctionComponent = () => {
  const [disable, setDisable] = useState(false)
  const { email } = useSelector((state: ApplicationState) => state.login.userInfo)
  const dispatch = useDispatch()
  const history: any = useHistory()
  const remove = history.location.state?.remove || false

  const onFinish = async (values: any) => {
    values.email = email
    delete values.password
    const response: any = await dispatch(actionChangePassword(values))
    message.loading('Changing....', () => {
      setDisable(true)
      if (response.status && response.status === 200) {
        message.success(response.message, 1, () => {
          dispatch(actionLogOut())
        })
      } else {
        if (response.status && response.status !== 200) {
          message.error(response.message, 1)
        } else {
          message.error('Thay đổi mật khẩu gặp lỗi', 1)
        }
        setDisable(false)
      }
    })
  }
  return (
    <div className="changePassword">
      <div className="container">
        <Title level={2}>ĐỔI MẬT KHẨU</Title>
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
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="password"
              hasFeedback
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại mất khẩu mới"
              name="newPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please input confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={disable} block>
                Gửi
              </Button>
            </Form.Item>
            {
              remove && (
              <Form.Item>
                <Button type="primary" onClick={() => history.goBack()} block danger>
                  Hủy
                </Button>
              </Form.Item>
              )
            }
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
