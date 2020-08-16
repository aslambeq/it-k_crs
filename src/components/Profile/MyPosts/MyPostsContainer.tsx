import { connect } from 'react-redux'
import { actions } from '../../../redux/profile-reducer'
import { AppStateType } from '../../../redux/redux-store'
import MyPosts, { MapDispatchPropsType, MapStatePropsType } from './MyPosts'

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.postData
    } as MapStatePropsType
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    { addPost: actions.addPostActionCreator }
)(MyPosts)

export default MyPostsContainer
