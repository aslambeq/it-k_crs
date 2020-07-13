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

class UsersContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { currentPage, pageSize } = this.props
        this.props.getUsersThunkCreator(currentPage, pageSize) // [1]
    }

    onPageChanged = (pageNumber) => {
        const { pageSize } = this.props
        this.props.getUsersThunkCreator(pageNumber, pageSize)
    }

    render() {
        return (
            <>
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
let mapStateToProps = (state) => {
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
    // withAuthRedirect,
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage: setCurrentPageAC,
        toggleFollowingProgress: toggleFollowingProgressAC,
        getUsersThunkCreator
    })
)(UsersContainer)

// 1. callback getUsers: getUsersThunkCreator
