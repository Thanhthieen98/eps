import React, { FunctionComponent, useState } from 'react'
import {
  DatePicker, Collapse, Button, message, Menu, Dropdown, Modal,
} from 'antd'
import moment from 'moment'
import _ from 'lodash'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  SettingOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, CheckCircleOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router'
import { Layout } from '../../components'
import { actionGetOnsiteSearch, actionGetOTSearch } from '../../store/search/actions'
import { Types } from '../../store/register/types'
import { ApplicationState } from '../../store'
import { actionDeleteOnsite, actionDeleteOT } from '../../store/register/actions'

const { Panel } = Collapse

// ca
const convertSHIP = (ship: any) => {
  switch (ship) {
    case 'SANG': {
      return 'Sáng'
    }
    case 'CHIEU': {
      return 'Chiều'
    }
    case 'TOI': {
      return 'Tối'
    }
    default:
      return ''
  }
}

export interface Props {}

const Search: FunctionComponent<Props> = () => {
  // state
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  // state  store
  const type = useSelector((state: ApplicationState) => state.register.type)
  const projects = useSelector((state: ApplicationState) => state.register.projects)
  // history web
  const history: any = useHistory()
  // dispatch
  const dispatch = useDispatch()
  const setTimeFrom = (date: any) => {
    setFrom(moment(date).format('YYYY-MM-DD'))
    setOpen(true)
  }
  const setTimeTo = (date: any) => {
    setTo(moment(date).format('YYYY-MM-DD'))
    setOpen(false)
  }

  const onClick = async (isDelete?: boolean) => {
    setLoading(true)
    const payload = { from: from ? from : moment().startOf('M').format('YYYY-MM-DD'), to: to ? to : moment().format('YYYY-MM-DD') }
    let check: any
    if (type === Types.OT) {
      check = await dispatch(actionGetOTSearch(payload))
    } else {
      check = await dispatch(actionGetOnsiteSearch(payload))
    }
    if (check.status !== 200) {
      message.error({ key: 'errorSearch', content: "Search's not working" })
      // Check xem hành động xóa hay search để hiện thị message cho hợp lý
    } else if (isDelete) {
      setData(check.data)
    } else {
      _.isEmpty(check.data) ? message.info({ key: 'infoSearch', content: 'No result' }) : setData(check.data)
    }
    setLoading(false)
  }

  const confirm = (id: any) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure?',
      okText: 'Ok',
      cancelText: 'Cancel',
      onOk: () => deleteRecord(id),
      onCancel: () => {},
    })
  }

  const deleteRecord = async (id : any) => {
    setLoading(true)
    let check : any
    if (type === Types.OT) {
      check = await dispatch(actionDeleteOT(id))
    } else {
      check = await dispatch(actionDeleteOnsite(id))
    }
    if (!check.status) {
      message.error({ key: 'errorDelete', content: 'Delete fail' })
    } else {
      message.info({ key: 'infoDelete', content: 'Delete success' })
    }
    setLoading(false)
    onClick(true)
  }

  const editRecord = (record: any) => {
    history.push('/register', { record, name: type })
  }

  const menu = (record: any) => (
    <Menu>
      <Menu.Item key="1" icon={<EditOutlined />} onClick={() => editRecord(record)}>
        Edit
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<DeleteOutlined />}
        onClick={(event: any) => {
          event.domEvent.stopPropagation()
          confirm(record.id)
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  )

  const genExtra = (record: any) => {
    if (record.approved) {
      return (<CheckCircleOutlined style={{ color: 'green' }} />)
    }

    return (
      <Dropdown trigger={['click']} overlay={() => menu(record)}>
        <SettingOutlined onClick={event => event.stopPropagation()} />
      </Dropdown>
    )
  }

  return (
    <Layout name={type}>
      <p>Thời gian</p>
      <div className="search__time">
        <DatePicker
          format="DD/MM/YYYY"
          defaultValue={moment().startOf('M')}
          inputReadOnly
          onChange={setTimeFrom}
        />
        <DatePicker
          format="DD/MM/YYYY"
          defaultValue={moment()}
          onClick={() => setOpen(true)}
          open={open}
          inputReadOnly
          onChange={setTimeTo}
        />
      </div>
      <Button
        className="mb--20 mt--20"
        size="large"
        type="primary"
        block
        onClick={() => onClick()}
        loading={loading}
      >
        Search
      </Button>
      {data.length > 0 ? (
        <>
          <p>
            <span>
              Có tổng
              {' '}
              {data.length}
              {' '}
              {type.split(' ')[2]}
            </span>
          </p>
          <Collapse>
            {data.map((item: any, index) => (
              <Panel header={item.date} key={index} extra={genExtra(item)}>
                <p>
                  <span>Dự án :</span>
                  {' '}
                  {_.get(_.find(projects, { id: item.project }), 'name')}
                </p>
                {item.ship && item.time ? (
                  <div>
                    <p>
                      <span>Ca :</span>
                      {' '}
                      {convertSHIP(item.ship)}
                    </p>
                    <p>
                      <span>Thời gian :</span>
                      <br />
                      {item.time}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                {item.displayTime
                && (
                <p>
                  <span>Thời gian :</span>
                  {item.displayTime}
                </p>
                )}
                <p>
                  <span>Ghi chú :</span>
                  {' '}
                  {item.note}
                </p>
              </Panel>
            ))}
          </Collapse>
        </>
      ) : (
        <> </>
      )}
    </Layout>
  )
}

export default Search
