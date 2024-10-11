import React from 'react'
import { SearchOutlined, BellOutlined } from '@ant-design/icons'
import avter from '@/assets/userInfo/avter.jpg'
import classes from './index.module.less'
const UserInfor: React.FC = () => {
  return (
    <div className={classes['userinfo-wrapper']}>
      <SearchOutlined className={classes['userinfo-icon']} />
      <BellOutlined className={classes['userinfo-icon']} />
      <img src={avter} alt="可爱捏" className={classes['userinfo-img']} />
      <div className={classes['userinfo-title']}>月晕</div>
    </div>
  )
}

export default UserInfor
