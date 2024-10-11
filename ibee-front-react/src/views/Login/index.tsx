import React, { useState } from 'react'
import { Input, message } from 'antd'
import classes from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '@/api/login'
const Login: React.FC = () => {
  //使用useState记录login的信息
  const [login, setLogin] = useState({
    password: ''
  })
  const navigate = useNavigate()
  const getLogin = async () => {
    const loginResult = await userLogin(login.password)
    console.log(loginResult)
    if (login.password === '') {
      message.warning('请输入账号和密码')
      return
    }
    if (loginResult === 'success') {
      message.success('welcome admin')
      navigate('/home')
    } else if (loginResult === 'fail') {
      message.error('账号或密码错误')
    } else if (loginResult === 'error') {
      message.warning('网络出现错误请联系管理员')
    }
  }
  return (
    <>
      <div className={classes.shell}>
        <div className={classes['card-wrapper']}>
          <div className={classes['card-circle']}></div>
          <div
            className={`${classes['card-circle']} ${classes['card-circle-t']}`}
          ></div>
          <div className={classes['card-container']}>
            <h2
              className={`${classes['card-title']} ${classes.title}`}
              style={{ letterSpacing: '0px' }}
            >
              Welcome Back！
            </h2>
            <p
              className={`${classes['card-description']} ${classes.description}`}
            >
              IBEE 管理后台
            </p>
            <Input
              className={classes.form_input}
              placeholder="请输入密码"
              type="password"
              value={login.password}
              onChange={(e) => setLogin({ password: e.target.value })}
            ></Input>
            <button
              className={`${classes['card-btn']} ${classes.button} ${classes['card_btn']}`}
              onClick={getLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
