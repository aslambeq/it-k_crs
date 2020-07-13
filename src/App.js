import React from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import Preloader from './components/Common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import Music from './components/Music/Music'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import Settings from './components/Settings/Settings'
import UsersContainer from './components/Users/UsersContainer'
import { withSuspense } from './hoc/withSuspense'
import { initializeApp } from './redux/app-reducer'
import store from './redux/redux-store'

// import DialogsContainer from './components/Dialogs/DialogsContainer'
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

// import ProfileContainer from './components/Profile/ProfileContainer'
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
                    <Route path='/users' render={() => <UsersContainer />} />
                    <Route path='/news' render={() => <News />} />
                    <Route path='/music' render={() => <Music />} />
                    <Route path='/settings' render={() => <Settings />} />
                    <Route path='/login' render={() => <Login />} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App)

const MainApp = (props) => {
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
