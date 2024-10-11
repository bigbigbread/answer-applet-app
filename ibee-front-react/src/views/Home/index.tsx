import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import UserInfor from '@/components/UserInfo/user'
// import HomeData from '@/components/Home/HomeData.tsx'
import classes from './index.module.less'
import { Outlet, useNavigate } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]
const Home: React.FC = () => {
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem
  }
  const [openKeys, setOpenKeys] = useState(['1'])
  const navigateTo = useNavigate()
  const MeunListItems: MenuItem[] = [
    getItem('ibee题库后台', '1', '', [
      getItem('题目管理', 'problemManage'),
      getItem('知识点管理', 'knowledgeManage')
    ])
  ]
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    console.log(keys)
    setOpenKeys((perKeys) => {
      console.log(perKeys, keys)
      return keys
    })
  }
  useEffect(() => {
    navigateTo('/home/problemManage')
  }, [])
  return (
    <>
      <Layout className={classes['home-wrapper']}>
        <Header className={classes['home-wrapper-hedear']}>
          <div className={classes['home-hedear-title']}>ibee管理后台</div>
          <UserInfor></UserInfor>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken)
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type)
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['']}
              items={MeunListItems}
              openKeys={openKeys}
              defaultOpenKeys={['problemManage']}
              onOpenChange={onOpenChange}
              onClick={(e) => {
                navigateTo(`/home/${e.key}`)
              }}
              selectedKeys={[window.location.pathname.split('/').pop() || '']}
              //默认点击第一个
            />
          </Sider>
          <Layout
            style={{
              // backgroundColor: '#fff'
              height: '80vh'
            }}
          >
            <Content className={classes['home-content-wrapper']}>
              <div className={classes['home-content-show']}>
                <Outlet></Outlet>
              </div>
            </Content>
            <Footer
              style={{
                height: '15px',
                textAlign: 'center'
              }}
            >
              未央Ibee 管理后台
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

export default Home
