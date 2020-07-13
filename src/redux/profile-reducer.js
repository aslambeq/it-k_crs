import { usersAPI, profileAPI } from '../api/api'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'

let initialState = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 0 },
        { id: 2, message: "It's my first post", likesCount: 10 },
        { id: 3, message: 'Lorem Ipsum is simply dummy text...', likesCount: 42 }
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case DELETE_POST: {
            return { ...state, postData: state.postData.filter((p) => p.id != action.postId) }
        }
        default:
            return state
    }
}

export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST,
    newPostText
})
export const deletePostActionCreator = (postId) => ({
    type: DELETE_POST,
    postId
})

export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile }
}

export const setStatus = (status) => {
    return { type: SET_STATUS, status }
}

export const getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
}

export default profileReducer

// in response - result to resolve promise