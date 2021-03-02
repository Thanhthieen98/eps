import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react'
import {
  Calendar, Col, Row, Spin, Badge, message, Button, Dropdown, Menu,
} from 'antd'
import { Link } from 'react-router-dom'
import moment, { Moment } from 'moment'
import './styles.scss'
import _ from 'lodash'
import { CaretLeftOutlined, CaretRightOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetOnsiteSearch, actionGetOTSearch } from '../../store/search/actions'
import { Layout } from '../../components'
import { ApplicationState } from '../../store'

// render
const MyCalendar: FunctionComponent = () => {
  const [loading, setLoading] = useState(false)
  const [toDay, setToDay] = useState(moment())
  const [dateSelect, setDateSelect] = useState(moment())
  const [dataOT, setDataOT] = useState<any>([])
  const [dataOnsite, setDataOnsite] = useState<any>([])
  const [lstDataOnsite, setLstDataOnsite] = useState<any[]>([])
  const [lstDataOT, setLstDataOT] = useState<any[]>([])

  const projects = useSelector((state: ApplicationState) => state.register.projects)

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchAPI() {
      setLoading(true)
      const from = moment(toDay).startOf('M').format('YYYY-MM-DD')
      const to = moment(toDay).endOf('M').format('YYYY-MM-DD')
      const resOnsite: any = await dispatch(actionGetOnsiteSearch({ from, to }))
      if (resOnsite.status !== 200) {
        message.error({ key: 'errorSearchOnsite', content: 'get data onsite wrong!' })
      } else {
        setLstDataOnsite(resOnsite.data)
        setDataOnsite(_.filter(resOnsite.data, { date: toDay.format('DD/MM/YYYY') }))
      }
      const resOT: any = await dispatch(actionGetOTSearch({ from, to }))
      if (resOT.status !== 200) {
        message.error({ key: 'errorSearchOT', content: 'get data OT wrong!' })
      } else {
        setLstDataOT(resOT.data)
        setDataOT(_.filter(resOT.data, { date: toDay.format('DD/MM/YYYY') }))
      }
      setLoading(false)
    }
    fetchAPI()
  }, [toDay, dispatch])

  // menu dropdown
  const menu = (
    <Menu>
      <Menu.Item>
        <Link
          to={{
            pathname: '/register',
            state: { name: 'Đăng ký Onsite', dateSelect: dateSelect.format('DD/MM/YYYY') },
          }}
        >
          Đăng ký Onsite
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to={{
            pathname: '/register',
            state: { name: 'Đăng ký OT', dateSelect: dateSelect.format('DD/MM/YYYY') },
          }}
        >
          Đăng ký OT
        </Link>
      </Menu.Item>
    </Menu>
  )

  const preMonth = useCallback((onChange: Function, value: Moment) => {
    const newValue = value.clone().subtract(1, 'M')
    setToDay(newValue)
    onChange(newValue)
  }, [])
  const nextMonth = useCallback((onChange: Function, value: Moment) => {
    const newValue = value.clone().add(1, 'M')
    setToDay(newValue)
    onChange(newValue)
  }, [])

  const headerRender = ({ value, onChange }: any) => {
    const day = toDay.month() + 1
    const year = toDay.year()
    return (
      <Row style={{ padding: 5 }}>
        <Col flex={2}>
          <CaretLeftOutlined onClick={() => preMonth(onChange, value)} />
        </Col>
        <Col flex={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold' }}>
            {`Tháng ${day} / ${year}`}
          </div>
        </Col>
        <Col flex={2} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <CaretRightOutlined onClick={() => nextMonth(onChange, value)} />
        </Col>
      </Row>
    )
  }

  const dateCellRender = (value: Moment) => (
    <div style={{
      width: 24, height: 20, display: 'table', position: 'static',
    }}
    >
      <div style={{
        position: 'absolute', top: 16, left: 2, width: '100%',
      }}
      >
        { _.find(lstDataOT, { date: value.format('DD/MM/YYYY') }) && <Badge color="red" style={{ width: 8 }} />}
        { _.find(lstDataOnsite, { date: value.format('DD/MM/YYYY') }) && <Badge color="green" style={{ width: 8 }} />}
      </div>
    </div>
  )

  const onSelect = (value: Moment) => {
    setDateSelect(value)
    setDataOnsite(_.filter(lstDataOnsite, { date: value.format('DD/MM/YYYY') }))
    setDataOT(_.filter(lstDataOT, { date: value.format('DD/MM/YYYY') }))
  }

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Layout name="Lịch cá nhân" btn={false}>
        <div className="myCalendar">
          <Calendar
            fullscreen={false}
            headerRender={headerRender}
            dateCellRender={dateCellRender}
            onSelect={onSelect}
          />
        </div>
        <div style={{ paddingLeft: 10, paddingTop: 20 }}>
          {dataOT.length > 0 && dataOT.map((item: any) => (
            <div key={item.id} style={{ display: 'flex', marginBottom: 15 }}>
              <Badge color="red" className="dot-calendar" />
              <div>
                <p style={{ margin: 0 }}>
                  <span>
                    [OT] Dự án
                    {' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {_.get(_.find(projects, { id: item.project }), 'name')}
                    </span>
                    :
                    {' '}
                    <br />
                    Thời gian:
                    <br />
                    {item.time}
                  </span>
                </p>
                <p>
                  <small style={{ color: 'gray', opacity: 0.8 }}>
                    note:
                    {' '}
                    {item.note}
                  </small>
                </p>
              </div>
            </div>
          ))}
          {dataOnsite.length > 0 && dataOnsite.map((item: any) => (
            <div key={item.id} style={{ display: 'flex' }}>
              <Badge color="green" className="dot-calendar" />
              <div>
                <p style={{ margin: 0 }}>
                  <span>
                    [Onsite] Dự án
                    {' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {_.get(_.find(projects, { id: item.project }), 'name')}
                    </span>
                    :
                    {' '}
                    {item.displayTime}
                  </span>
                </p>
                <p>
                  <small style={{ color: 'gray', opacity: 0.8 }}>
                    note:
                    {' '}
                    {item.note}
                  </small>
                </p>
              </div>
            </div>
          ))}
        </div>
        <Dropdown overlay={menu} placement="topCenter" arrow trigger={['click']}>
          <Button className="btn--add" type="primary" shape="circle" size="large">
            <PlusOutlined />
          </Button>
        </Dropdown>
      </Layout>
    </Spin>
  )
}

export default MyCalendar
