import {
  Button, Form, Input, message, Spin,
} from 'antd'
import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import _ from 'lodash'
import { Layout } from '../../../components'
import { actionSaveBankInfo, actionUpdateBankInfo } from '../../../store/profile/actions'

export interface Props{
}

const SaveBankInfo: FunctionComponent<Props> = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const history: any = useHistory()
  const { record } = history.location.state || {}

  const onFinish = async (values: any) => {
    setLoading(true)
    let res: any
    if (record) {
      res = await dispatch(actionUpdateBankInfo({ paymentBankId: record._id, ...values }))
    } else {
      res = await dispatch(actionSaveBankInfo(values))
    }
    if (res && res.status === 200) {
      message.success('Lưu thành công')
    } else {
      message.error(_.get(res, 'message', 'Lưu thất bại'))
    }
    setLoading(false)
  }
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Layout name="Thông tin thanh toán" btn={false}>
        <Form
          layout="vertical"
          size="middle"
          requiredMark={false}
          initialValues={record}
          onFinish={onFinish}
        >
          <Form.Item name="accName" label="Ngân hàng (accName)">
            <Input />
          </Form.Item>

          <Form.Item name="accNo" label="Số tài khoản (accNo)">
            <Input />
          </Form.Item>

          <Form.Item name="name" label="Chủ tài khoản">
            <Input />
          </Form.Item>

          <Form.Item name="branch" label="Chi nhánh">
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

export default SaveBankInfo
