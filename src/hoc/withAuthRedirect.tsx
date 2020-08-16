import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/redux-store'

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    /* class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login' />
            return <WrappedComponent {...this.props} />
        }
    } */

    const RedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        const { isAuth, ...restProps } = props

        if (!isAuth) return <Redirect to='/login' />

        return <WrappedComponent {...(restProps as WCP)} />
    }

    const ConnectedAuthRedirectComponent = connect<
        MapStatePropsType,
        MapDispatchPropsType,
        WCP,
        AppStateType
    >(
        mapStateToPropsForRedirect,
        {}
    )(RedirectComponent)

    return ConnectedAuthRedirectComponent
}
// WCP - Wrapped Component Props
