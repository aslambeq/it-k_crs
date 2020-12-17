import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Layout, Menu, Row, Tooltip } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/auth-reducer'
import {
  selectCurrentUserLogin,
  selectIsAuth
} from '../../redux/auth-selectors'

export type MapStatePropsType = {}

export const Header: React.FC<MapStatePropsType> = props => {
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  const { Header } = Layout
  return (
    <Header className='header'>
      <div className='logo' />
      <Row>
        <Col span={18}>
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Link to='/profile'>Profile</Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link to='/users'>Users</Link>
            </Menu.Item>
            <Menu.Item key='3'>nav 3</Menu.Item>
          </Menu>
        </Col>

        {isAuth ? (
          <>
            <Col span={1}>
              <Tooltip placement='bottom' title={login}>
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
            </Col>
            <Col span={5}>
              <Button onClick={logoutHandler}>Log Out</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to={'/login'}>Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>

    // <header className={s.header} >
    //     <img src={cat} />
    //     <div className={s.loginBlock}>
    //         {props.isAuth
    //             ? <div>{props.login} <button onClick={props.logout}>Log Out</button></div>
    //             : <NavLink to={'/login'}>Login</NavLink>}

    //     </div>
    // </header >
  )
}
