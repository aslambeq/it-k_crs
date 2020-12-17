import React from 'react'
import { connect, Provider } from 'react-redux'
import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import 'antd/dist/antd.css'
import Preloader from './components/Common/Preloader/Preloader'
import { Login } from './components/Login/Login'
import Music from './components/Music/Music'
import News from './components/News/News'
import Settings from './components/Settings/Settings'
import { UsersPage } from './components/Users/UsersContainer'
import { withSuspense } from './hoc/withSuspense'
import { initializeApp } from './redux/app-reducer'
import store, { AppStateType } from './redux/redux-store'
import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from 'antd'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons'
import { Header } from './components/Header/Header'

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

const DialogsContainer = React.lazy(
  () => import('./components/Dialogs/DialogsContainer')
)
const ProfileContainer = React.lazy(
  () => import('./components/Profile/ProfileContainer')
)

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('err0r occured')
    // console.error(PromiseRejectionEvent)
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.catchAllUnhandledErrors
    )
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <Layout>
        <Header />

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className='site-layout-background'
            style={{ padding: '24px 0' }}
          >
            <Sider className='site-layout-background' width={200}>
              <Menu
                mode='inline'
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key='sub1' icon={<UserOutlined />} title='My Profile'>
                  <Menu.Item key='1'>
                    <Link to='/profile'>Profile</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    <Link to='/dialogs'>Messages</Link>
                  </Menu.Item>
                  <Menu.Item key='3'>option3</Menu.Item>
                  <Menu.Item key='4'>option4</Menu.Item>
                </SubMenu>
                <SubMenu key='sub2' icon={<LaptopOutlined />} title='Users'>
                  <Menu.Item key='5'>
                    <Link to='/users'>Users</Link>
                  </Menu.Item>
                  <Menu.Item key='6'>option6</Menu.Item>
                  <Menu.Item key='7'>option7</Menu.Item>
                  <Menu.Item key='8'>option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key='sub3'
                  icon={<NotificationOutlined />}
                  title='subnav 3'
                >
                  <Menu.Item key='9'>option9</Menu.Item>
                  <Menu.Item key='10'>option10</Menu.Item>
                  <Menu.Item key='11'>option11</Menu.Item>
                  <Menu.Item key='12'>option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Redirect exact from='/' to='/profile' />
                <Route
                  path='/profile/:userId?'
                  render={() => <SuspendedProfile />}
                />
                <Route path='/dialogs' render={() => <SuspendedDialogs />} />
                <Route
                  path='/users'
                  render={() => <UsersPage pageTitle={'user list'} />}
                />
                <Route path='/news' render={() => <News />} />
                <Route path='/music' render={() => <Music />} />
                <Route path='/settings' render={() => <Settings />} />
                <Route path='/login' render={() => <Login />} />
                <Route path='*' render={() => <div>404</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
    {
      /* <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            <Redirect exact from='/' to='/profile' />
            <Route
              path='/profile/:userId?'
              render={() => <SuspendedProfile />}
            />
            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
            <Route
              path='/users'
              render={() => <UsersPage pageTitle={'user list'} />}
            />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <div>404</div>} />
          </Switch>
        </div>
      </div> */
    }
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

const MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}
export default MainApp

// <BrowserRouter basename={process.env.PUBLIC_URL}> || <HashRouter> - github pages deploy

// <Route path='/profile' component={Profile} />  || <Route path ='/profile' render={() => <Profile />}
