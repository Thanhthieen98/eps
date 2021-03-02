import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Layout } from '../../components'
import './styles.scss'
import { actionOT, actionOnside } from '../../store/register/actions'

export interface Props {}

const Home: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  return (
    <Layout name="Trang chủ" btnBack={false} btn={false}>
      <p>Chức năng</p>
      <div>
        <Button className="mb--10 pt--30 pb--60" size="large" block>
          <Link
            to="/my-calendar"
          >
            Lịch cá nhân
          </Link>
        </Button>
        <Button className="mb--10 pt--30 pb--60" size="large" block>
          <Link
            to="/search"
            onClick={() => dispatch(actionOT())}
          >
            Đăng ký OT
          </Link>
        </Button>
        <Button className="pt--30 pb--60" size="large" block>
          <Link
            to="/search"
            onClick={() => dispatch(actionOnside())}
          >
            Đăng ký Onsite
          </Link>
        </Button>
      </div>
    </Layout>
  )
}
export default Home
