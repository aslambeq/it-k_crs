import React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { compose } from 'redux'
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile
} from '../../redux/profile-reducer'
import Profile from './Profile'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types'

// todo:    1. change MapStatePropsType definition
//          2. change saveProfile type defintion
type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
  userId: string
}

type PropsType = MapStatePropsType &
  MapDispatchPropsType &
  RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props)
  }
  reloadProfile() {
    let userId: number | null = +this.props.match.params.userId
    // check 'cannot assign to 'userId' because it is a const' error
    if (!userId) {
      userId = this.props.authorisedUserId
      if (!userId) {
        // todo: Redirect or push
        this.props.history.push('/login')
      }
    }

    if (!userId) {
      console.error(
        "id should exist in URI params or state ('authorizedUserId')"
      )
    } else {
      this.props.getUserProfile(userId)
      this.props.getStatus(userId)
    }
  }

  componentDidMount() {
    this.reloadProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.reloadProfile()
    }
  }

  componentWillUnmount(): void {}

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

const mapStateToProps = (state: AppStateType) => {
  // console.log('mapStateToProps PROFILE')
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.id,
    isAuth: state.auth.isAuth
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
  }),
  withRouter
  // withAuthRedirect
)(ProfileContainer)
