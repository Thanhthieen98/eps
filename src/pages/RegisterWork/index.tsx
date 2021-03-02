import React, { FunctionComponent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  message,
  Spin,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Types } from '../../store/register/types'
import { Layout } from '../../components'
import {
  actionAddOT,
  actionGetAllProject,
  actionAddOnsite,
  actionMemberProject,
  actionEditOT,
  actionEditOnsite,
} from '../../store/register/actions'
import './styles.scss'
import { ApplicationState } from '../../store'

export interface Props {}

const SHIP = [
  { label: 'Sáng', value: 'SANG' },
  { label: 'Chiều', value: 'CHIEU' },
  { label: 'Tối', value: 'TOI' },
  { label: 'Cả ngày', value: 'CA_NGAY' },
]

const ROLE = {
  AD: 'AD',
  PM: 'PM',
  EM: 'EM',
}

const TimeRangePicker = TimePicker.RangePicker

const RegisterWork: FunctionComponent<Props> = () => {
  const [form] = Form.useForm()
  // state
  const [options, setOptions] = useState([])
  const [disable, setDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [member, setMember] = useState([])
  const role = useSelector(
    (state: ApplicationState) => state.login.userInfo.role,
  )
  // dispatch
  const dispatch = useDispatch()
  // history
  const history: any = useHistory()
  const { name, record, dateSelect } = history.location.state

  useEffect(() => {
    const getProject = async () => {
      setLoading(true)
      const res: any = await dispatch(actionGetAllProject())
      const array = _.get(res, 'data', []).map((item: any) => ({
        label: item.name,
        value: item._id,
      }))
      setOptions(array)
      setLoading(false)
    }
    getProject()
  }, [dispatch])

  const clickProject = async (value: any) => {
    if (role === ROLE.AD || role === ROLE.PM) {
      setLoading(true)
      const member: any = await dispatch(actionMemberProject(value))
      if (member.status !== 200) {
        message.error('lấy thành viên dự án gặp lỗi')
        setLoading(false)
      } else {
        setMember(member.member)
        setLoading(false)
      }
    }
  }

  const onFocus = (e: any) => {
    e.preventDefault()
  }

  const editRecord = async (values: any) => {
    let check: any
    const { id } = record
    if (name === Types.OT) {
      const start = `${moment(values.dateStart).format('DD/MM/YYYY')} ${moment(
        values.start,
      ).format('HH:MM')}`
      const end = `${moment(values.dateEnd).format('DD/MM/YYYY')} ${moment(
        values.end,
      ).format('HH:MM')}`
      const { status }: any = await dispatch(
        actionEditOT({
          ...values,
          start,
          end,
          ot_date: values.dateStart,
          id,
        }),
      )
      check = status
    } else {
      const start = moment(values.time[0]).format('HH:mm')
      const end = moment(values.time[1]).format('HH:mm')
      const { status }: any = await dispatch(
        actionEditOnsite({
          ...values,
          start,
          end,
          id,
        }),
      )
      check = status
    }
    if (check) {
      message.success('success', 1)
      history.goBack()
    } else {
      message.error('Đăng ký không thành công')
      setDisable(false)
    }
  }

  const createRecord = async (values: any) => {
    let check: any
    if (name === Types.OT) {
      const start = `${moment(values.dateStart).format('DD/MM/YYYY')} ${moment(
        values.start,
      ).format('HH:mm')}`
      const end = `${moment(values.dateEnd).format('DD/MM/YYYY')} ${moment(
        values.end,
      ).format('HH:mm')}`
      const { status }: any = await dispatch(
        actionAddOT({
          ...values,
          start,
          end,
          ot_date: values.dateStart,
        }),
      )
      check = status
    } else {
      const start = moment(values.time[0]).format('HH:mm')
      const end = moment(values.time[1]).format('HH:mm')
      const { status }: any = await dispatch(
        actionAddOnsite({ ...values, start, end }),
      )
      check = status
    }
    if (check) {
      message.success('success', 1)
      history.goBack()
    } else {
      message.error('Đăng ký không thành công')
      setDisable(false)
    }
  }

  const onFinish = (values: any) => {
    setDisable(true)
    message.loading('post...', async () => {
      if (record) {
        editRecord(values)
      } else {
        createRecord(values)
      }
    })
  }

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Layout name={name} btn={false}>
        <Form
          layout="vertical"
          size="middle"
          form={form}
          requiredMark={false}
          onFinish={onFinish}
          initialValues={{
            ...record,
            start: record ? moment(record.start, 'DD/MM/YYYY HH:mm') : '',
            end: record ? moment(record.end, 'DD/MM/YYYY HH:mm') : '',
            dateStart: dateSelect ? moment(dateSelect, 'DD/MM/YYYY') : (record ? moment(record.start, 'DD/MM/YYYY') : ''),
            dateEnd: record ? moment(record.end, 'DD/MM/YYYY') : '',
            time:
              record && record.timeWork
                ? record?.timeWork.map((item: any) => moment(item, 'HH:mm'))
                : [],
            ot_date: dateSelect ? moment(dateSelect, 'DD/MM/YYYY') : (record ? moment(record.date, 'DD/MM/YYYY') : ''),
          }}
        >
          {name === Types.OT && (
            <>
              <Form.Item
                name="ship"
                label="Ca"
                rules={[{ required: true, message: 'Please select' }]}
              >
                <Select placeholder="Select" options={SHIP} />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="project"
            label="Dự án"
            rules={[{ required: true, message: 'Please select' }]}
          >
            <Select
              placeholder="Select"
              options={options}
              onChange={clickProject}
            />
          </Form.Item>
          {name === Types.OT ? (
            <>
              <Form.Item label="Thời gian bắt đầu" style={{ marginBottom: 0 }}>
                <div className="form--time">
                  <Form.Item
                    name="dateStart"
                    rules={[{ required: true, message: 'Please select' }]}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      onClick={onFocus}
                      inputReadOnly
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: 'Please select' }]}
                    name="start"
                  >
                    <TimePicker inputReadOnly format="HH:mm" onSelect={(val: any) => form.setFieldsValue({ start: val })} />
                  </Form.Item>
                </div>
              </Form.Item>
              <Form.Item label="Thời gian kết thúc" style={{ marginBottom: 0 }}>
                <div className="form--time">
                  <Form.Item
                    name="dateEnd"
                    rules={[{ required: true, message: 'Please select' }]}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      onClick={onFocus}
                      inputReadOnly
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: 'Please select' }]}
                    name="end"
                  >
                    <TimePicker inputReadOnly onSelect={(val: any) => form.setFieldsValue({ end: val })} format="HH:mm" />
                  </Form.Item>
                </div>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="ot_date"
                label="Ngày"
                rules={[{ required: true, message: 'Please select' }]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  onClick={onFocus}
                  inputReadOnly
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: 'Please select' }]}
                name="time"
                label="Thời gian"
              >
                <TimeRangePicker format="HH:mm" />
              </Form.Item>
            </>
          )}
          {(role === ROLE.AD || role === ROLE.PM) && (
            <Form.Item name="employee" label="Thành viên">
              <Select placeholder="Select" options={member} />
            </Form.Item>
          )}
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={disable}
              block
            >
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </Spin>
  )
}

export default RegisterWork
