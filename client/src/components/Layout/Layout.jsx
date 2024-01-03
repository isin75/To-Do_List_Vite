import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ConfigProvider, Layout, theme } from 'antd'
import { useSelector } from 'react-redux'
import Head from '../header/header'
import SiderCatedory from '../categoryList/SiderCatedory'
import Footer from '../footer/footer'

const { Header, Sider } = Layout

const Layouts = () => {
  const location = useLocation()
  const { isTheme } = useSelector((s) => s.toDoSlice)

  const shouldShowSidebar =
    location.pathname !== '/login' &&
    location.pathname !== '/registration' &&
    location.pathname !== '/activate'
  const algorithm = isTheme ? theme.darkAlgorithm : theme.defaultAlgorithm

  return (
    <ConfigProvider theme={{ algorithm }}>
      <Layout className="min-h-screen">
        <Header className="w-full top-0" theme="light">
          <Head />
        </Header>
        {shouldShowSidebar && (
          <Layout hasSider className="w-full">
            <Sider
              style={{
                height: 'calc(100vh - 96px)',
                position: 'fixed',
                left: 0,
                backgroundColor: 'white'
              }}
              className="w-[60px]"
            >
              <SiderCatedory />
            </Sider>
            <Layout.Content style={{ marginLeft: 210, height: 'calc(100vh - 96px)' }}>
              <Outlet />
            </Layout.Content>
          </Layout>
        )}
        {!shouldShowSidebar && (
          <Layout className="w-full">
            <Layout.Content
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(100vh - 96px)'
              }}
            >
              <Outlet />
            </Layout.Content>
          </Layout>
        )}
        <Layout.Footer className="flex flex-col justify-center items-center fixed bottom-0 w-full h-[32px] bg-[#001529]">
          <Footer />
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default Layouts
