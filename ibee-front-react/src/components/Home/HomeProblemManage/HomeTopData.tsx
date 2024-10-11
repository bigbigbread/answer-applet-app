import React from 'react'
import {
  MenuUnfoldOutlined,
  DownOutlined,
  SmileOutlined
} from '@ant-design/icons'
import classes from './index.module.less'
import type { MenuProps } from 'antd'
import { Dropdown, Space, Button } from 'antd'
const iconStyle = {
  color: 'black'
}
const buttonStyle = {
  first: {
    marginLeft: '12px',
    marginRight: '12px'
  },
  second: {
    backgroundColor: '#70DB7D'
  }
}
const items: MenuProps['items'] = [
  {
    key: '1',
    label: <a target="_blank">1st menu item</a>
  },
  {
    key: '2',
    label: <a target="_blank">2nd menu item (disabled)</a>,
    icon: <SmileOutlined />,
    disabled: true
  },
  {
    key: '3',
    label: <a target="_blank">3rd menu item (disabled)</a>,
    disabled: true
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item'
  }
]
const HomeTopData: React.FC = () => {
  return (
    <div className={classes['home-top-data-content']}>
      <Dropdown menu={{ items }}>
        <a
          onClick={(e) => e.preventDefault()}
          className={classes['home-top-data-title']}
        >
          <Space>
            <MenuUnfoldOutlined style={iconStyle}></MenuUnfoldOutlined>
            <DownOutlined style={iconStyle} />
          </Space>
        </a>
      </Dropdown>
      <Button type="primary" style={buttonStyle.first}>
        导出CSV
      </Button>
      <Button style={buttonStyle.second}>excel导入</Button>
    </div>
  )
}

export default HomeTopData
