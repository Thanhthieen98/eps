import {
  Avatar,
  Col,
  message,
  Row,
  Spin,
} from 'antd'
import React, {
  Fragment, FunctionComponent, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  UserOutlined, FormOutlined, CreditCardOutlined, PlusCircleOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router'
import _ from 'lodash'
import moment from 'moment'
import { Layout } from '../../../components'
import { ApplicationState } from '../../../store'
import './styles.scss'
import { actionGetProfile } from '../../../store/profile/actions'

export interface Props{
}

const Information: FunctionComponent<Props> = () => {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<Object>()

  const history = useHistory()
  const dispatch = useDispatch()

  // selector store
  const { name, _id } = useSelector((state : ApplicationState) => state.login.userInfo)
  const avatar = name.split(' ').pop().toUpperCase()

  useEffect(() => {
    async function getInfo() {
      setLoading(true)
      const resProfile: any = await dispatch(actionGetProfile(_id))
      if (resProfile && resProfile.status === 200) {
        setProfile(resProfile.data)
      } else {
        message.error('Lấy dữ liệu bị lỗi')
      }
      setLoading(false)
    }
    getInfo()
  }, [dispatch, _id])

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Layout name="Profile" btn={false}>
        <section className="profile-name">
          <div>
            <div className="profile-name__avatar">
              <Avatar size={90}><span>{avatar.charAt(0)}</span></Avatar>
            </div>
            <div className="profile-name__username">
              <p>{name}</p>
            </div>
          </div>
        </section>
        <section className="profile-info">
          <div style={{ width: '100%', background: '#e5e5e5' }} className="d-flex justify-content--between p--10">
            <div className="d-flex align-item--center">
              <UserOutlined style={{ fontSize: 25 }} />
              <p className="m--0 ml--5">Thông tin chung</p>
            </div>
            <div
              className="d-flex align-item--center profile__btn"
              onClick={() => history.push('/profile/save-info', {
                profile: {
                  ...profile,
                  dob: moment(_.get(profile, 'dob')).format('DD/MM/YYYY'),
                },
              })}
            >
              <FormOutlined style={{ fontSize: 22, cursor: 'pointer' }} />
            </div>
          </div>
          <div className="profile-info__list">
            <Row justify="space-between" className="pt--10 pl--10 pr--10">
              <Col flex={1}>
                <p className="m--0">Email</p>
              </Col>
              <Col className="d-flex justify-content--end" flex={5}>
                <span>{_.get(profile, 'personalEmail', '')}</span>
              </Col>
            </Row>
            <hr />
            <Row justify="space-between" className="pt--10 pl--10 pr--10">
              <Col flex={1}>
                <p className="m--0">Số điện thoại</p>
              </Col>
              <Col className="d-flex justify-content--end" flex={5}>
                <span>{_.get(profile, 'phone', '')}</span>
              </Col>
            </Row>
            <hr />
            <Row justify="space-between" className="pt--10 pl--10 pr--10">
              <Col flex={1}>
                <p className="m--0">Ngày sinh</p>
              </Col>
              <Col className="d-flex justify-content--end" flex={5}>
                <span>{ _.get(profile, 'dob') ? moment(_.get(profile, 'dob')).format('DD/MM/YYYY') : ''}</span>
              </Col>
            </Row>
            <hr />
            <Row justify="space-between" className="pt--10 pl--10 pr--10">
              <Col flex={1}>
                <p className="m--0">Ngày bắt đầu làm việc</p>
              </Col>
              <Col className="d-flex justify-content--end" flex={5}>
                <span>{_.get(profile, 'startWorkAt') ? moment(_.get(profile, 'dob')).format('DD/MM/YYYY') : ''}</span>
              </Col>
            </Row>
            <hr />
            <Row justify="space-between" className="pt--10 pl--10 pr--10">
              <Col flex={1}>
                <p className="m--0">Vị trí hiện tại</p>
              </Col>
              <Col className="d-flex justify-content--end" flex={5}>
                <span>{_.get(profile, 'position', '')}</span>
              </Col>
            </Row>
            <hr />
            <Row justify="space-between" className="pt--10 pl--10 pr--10">
              <Col span={9}>
                <p className="m--0">Nơi ở hiện tại</p>
              </Col>
              <Col className="d-flex justify-content--end" span={11}>
                <span>{_.get(profile, 'currentLocation', '')}</span>
              </Col>
            </Row>
            <hr />
            <Row justify="space-between" className="pt--10 pl--10 pr--10 mb--15">
              <Col span={9}>
                <p className="m--0">Quê quán</p>
              </Col>
              <Col className="d-flex justify-content--end" span={11}>
                <span>{_.get(profile, 'hometown', '')}</span>
              </Col>
            </Row>
          </div>
        </section>
        <section className="profile-bank">
          <div style={{ width: '100%', background: '#e5e5e5' }} className="d-flex justify-content--between p--10">
            <div className="d-flex align-item--center">
              <CreditCardOutlined style={{ fontSize: 25 }} />
              <p className="m--0 ml--5">Thông tin thanh toán</p>
            </div>
            <div className="d-flex align-item--center profile__btn" onClick={() => history.push('/profile/save-bank-info')}>
              <PlusCircleOutlined style={{ fontSize: 22, cursor: 'pointer' }} />
            </div>
          </div>
          <div className="profile-info__list">
            { _.isEmpty(_.get(profile, 'banksInfo', []))
              ? (
                <div className="pt--15" style={{ textAlign: 'center' }}>
                  <span>Chưa có thông tin thanh toán</span>
                  <hr />
                </div>
              )
              : (
                <>
                  {_.get(profile, 'banksInfo', []).map((item: any) => (
                    <Fragment key={item._id}>
                      <Row className="pt--10 pl--15 pr--10">
                        <Col span={16}>
                          <p>
                            {item.name}
                            <br />
                            <span>
                              {item.branch}
                            </span>
                            <br />
                            <span>{item.accNo}</span>
                            <br />
                            <span>{item.accName}</span>
                          </p>
                        </Col>
                        <Col span={8} className="d-flex justify-content--end align-item--center">
                          <FormOutlined className="profile__btn" style={{ fontSize: 22, cursor: 'pointer' }} onClick={() => history.push('/profile/save-bank-info', { record: item })} />
                        </Col>
                      </Row>
                      <hr />
                    </Fragment>
                  ))}
                </>
              )}
          </div>
        </section>
      </Layout>
    </Spin>
  )
}

export default Information
