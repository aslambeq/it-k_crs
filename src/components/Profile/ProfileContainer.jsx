import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import {
    getUserProfile,
    getStatus,
    updateStatus,
} from './../../redux/profile-reducer'
import Profile from './Profile'

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = this.props.authorisedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getUserProfile(userId)

        this.props.getStatus(userId)
    }

    render() {
        // console.log('RENDER PROFILE')
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}

let mapStateToProps = (state) => {
    // console.log('mapStateToProps PROFILE')
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorisedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter
    // withAuthRedirect
)(ProfileContainer)
