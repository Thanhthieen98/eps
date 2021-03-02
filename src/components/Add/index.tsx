import React, { FunctionComponent } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './styles.scss'
import { Link } from 'react-router-dom'

export interface Props {
  name: string
}

const Add: FunctionComponent<Props> = ({ name }) => (
  <Button className="btn--add" type="primary" shape="circle" size="large">
    <Link
      to={{
        pathname: '/register',
        state: { name },
      }}
    >
      <PlusOutlined />
    </Link>
  </Button>
)

export default Add
