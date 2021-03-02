import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  Typography, Form, Input, Button, message, Spin, Result,
} from 'antd'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { actionCheckToken, actionForgotPassword, actionResetPassword } from '../../store/forgotPassword/actions'

// config ant design
const { Title } = Typography

// render
const ChangePassword: FunctionComponent = () => {
  const [disable, setDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const { token } = useParams<any>()

  useEffect(() => {
    async function checkToken() {
      setLoading(true)
      const res:any = await dispatch(actionCheckToken(token))
      if (!res.status || (res.status && res.status !== 200)) {
        setResult(true)
      }
      setLoading(false)
    }
    token && checkToken()
  }, [dispatch, token])

  const resetPassword = async (data: any) => {
    const res: any = await dispatch(actionResetPassword({ ...data, token }))
    message.loading('Changing....', () => {
      if (res.status && res.status === 200) {
        message.success('Đặt lại mật khẩu thành công')
        history.push('/')
      } else {
        message.error('Đặt mật khẩu gặp lỗi')
        setDisable(false)
      }
    })
  }

  const sendMail = async (data: any) => {
    const res: any = await dispatch(actionForgotPassword(data))
    message.loading('Sending....', () => {
      if (res.status && res.status === 200) {
        message.success('Kiểm tra nội dung được gửi về email')
      } else {
        message.error(res.message)
      }
      setDisable(false)
    })
  }

  const onFinish = async (values: any) => {
    setDisable(true)
    if (token) {
      await resetPassword(values)
    } else {
      await sendMail(values)
    }
  }
  return (
    <Spin tip="Loading..." spinning={loading}>
      {result
        ? (
          <Result
            status="404"
            title="404"
            subTitle="Liên kết đặt lại mật khẩu đã quá hạn"
            extra={<Button type="primary" href="/">Back Home</Button>}
          />
        )
        : (
          <div className="changePassword">
            <div className="container">
              <Title level={2}>{ !token ? 'Quên mật khẩu' : 'Đặt lại mật khẩu'}</Title>
              <div>
                <Form
                  name="basic"
                  layout="vertical"
                  requiredMark={false}
                  size="large"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  {
            !token
              ? (
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input />
                </Form.Item>
              ) : (
                <>
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
                </>
              )
          }

                  <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={disable} block>
                      Gửi
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        )}
    </Spin>
  )
}

export default ChangePassword
