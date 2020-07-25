import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
    follow,
    getUsersThunkCreator,
    setCurrentPageAC,
    toggleFollowingProgressAC,
    unfollow
} from '../../redux/users-reducer'
import {
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getСurrentPage
} from '../../redux/users-selectors'
import Preloader from '../Common/Preloader/Preloader'
import Users from './Users'
import { UsersType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        const { currentPage, pageSize } = this.props
        this.props.getUsersThunkCreator(currentPage, pageSize) // [1]
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize } = this.props
        this.props.getUsersThunkCreator(pageNumber, pageSize)
    }

    render() {
        return (
            <>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

/* let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
    }
} */

// Selectors
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getСurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        getUsersThunkCreator
    })
)(UsersContainer)

// 1. callback (getUsers: getUsersThunkCreator)
