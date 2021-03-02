import {
  Button, DatePicker, Form, Input, message, Spin,
} from 'antd'
import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import moment from 'moment'
import _ from 'lodash'
import { Layout } from '../../../components'
import { actionSaveProfile } from '../../../store/profile/actions'

export interface Props{
}

const SaveInformation: FunctionComponent<Props> = () => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const history: any = useHistory()
  const { profile } = history.location.state || {}

  const validateMessages = {
    required: 'Input is required!',
    types: {
      email: 'Input is not a valid email!',
    },
    pattern: {
      mismatch: 'Input is not a valid number!',
    },
  }

  const onFinish = async (values: any): Promise<void> => {
    setLoading(true)
    const res: any = await dispatch(actionSaveProfile({ ...values, phone: `0${values.phone}` }))
    if (res && res.status === 200) {
      message.success(res.message)
    } else {
      message.error('Cập nhập thông tin không thành công')
    }
    setLoading(false)
  }
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Layout name="Profile" btn={false}>
        <Form
          layout="vertical"
          size="middle"
          requiredMark={false}
          validateMessages={validateMessages}
          initialValues={profile ? { ...profile, dob: moment(_.get(profile, 'dob'), 'DD-MM-YYYY') } : {}}
          onFinish={onFinish}
        >
          <Form.Item name="personalEmail" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Số điên thoại" rules={[{ required: true, pattern: /^-?\d*(\.\d*)?$/ }]}>
            <Input
              maxLength={9}
              addonBefore="+84"
            />
          </Form.Item>

          <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true }]}>
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>

          <Form.Item name="currentLocation" label="Nơi ở hiện tại" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="hometown" label="Quê quán" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </Spin>
  )
}

export default SaveInformation
