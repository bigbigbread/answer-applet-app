import { message } from 'antd'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import router from './index'
const loginRoute = '/login'
const indexRoute = '/home/knowledgeManage'
// 路由白名单待续...

const GoLoginPage = () => {
  const navigateTo = useNavigate()
  useEffect(() => {
    // 加载完毕后跳转到登录页
    navigateTo(loginRoute)
    message.warning('请先登录')
  }, [])
  return <div></div>
}

const GoIndexPage = () => {
  const navigateTo = useNavigate()
  useEffect(() => {
    // 加载完毕后跳转到首页
    navigateTo(indexRoute)
  }, [])
  return <div></div>
}

const AuthRouter: React.FC = () => {
  const outlet = useRoutes(router)
  const location = useLocation()
  const token = localStorage.getItem('token')
  if (token && location.pathname === loginRoute) {
    // 跳转到首页
    return <GoIndexPage></GoIndexPage>
  }
  if (location.pathname !== loginRoute && !token) {
    // 如果没有登录 且不在登录页
    return <GoLoginPage></GoLoginPage>
  }
  return <div>{outlet}</div>
}

export default AuthRouter
