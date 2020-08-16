import { stopSubmit, FormAction } from 'redux-form'
import { profileAPI } from '../api/profile-api'
import type { PhotosType, PostDataType, ProfileType } from '../types/types'
import { InferActionsTypes, BaseThunkType } from './redux-store'

let initialState = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 0 },
        { id: 2, message: "It's my first post", likesCount: 10 },
        { id: 3, message: 'Lorem Ipsum is simply dummy text...', likesCount: 42 }
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: '',
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
            }
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SN/PROFILE/DELETE_POST': {
            return { ...state, postData: state.postData.filter((p) => p.id != action.postId) }
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        default:
            return state
    }
}

// action creators ..{...return {type: _, action: _}}..

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: 'SN/PROFILE/ADD_POST', newPostText } as const),
    deletePostActionCreator: (postId: number) => ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
}

// thunk creators
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
        // show error: alert / dispatch('error') /
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit('edit_profile', { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
        // dispatch(stopSubmit('edit_profile', { 'contacts': { 'facebook': response.data.messages[0] } }))
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

// in response - result to resolve promise

