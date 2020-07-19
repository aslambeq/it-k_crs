import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
} from './../../redux/profile-reducer'
import Profile from './Profile'

class ProfileContainer extends React.Component {
    reloadProfile() {
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

    componentDidMount() {
        this.reloadProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.reloadProfile()
        }
    }

    render() {
        // console.log('RENDER PROFILE')
        return (
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
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
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter
    // withAuthRedirect
)(ProfileContainer)
