import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../utils/object-helpers'
import type { UsersType } from '../types/types'
import { AppStateType } from './redux-store'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of user id's
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id != action.userId)
            }
        }
        default:
            return state
    }
}

type ActionTypes =
    | FollowSuccessACActionType
    | UnfollowSuccessACActionType
    | SetUsersACActionType
    | SetCurrentPageACActionType
    | SetTotalUsersCountACActionType
    | ToggleIsFetchingACActionType
    | ToggleFollowingProgressACActionType

// action creators
type FollowSuccessACActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccessAC = (userId: number): FollowSuccessACActionType => ({
    type: FOLLOW,
    userId
})

type UnfollowSuccessACActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccessAC = (userId: number): UnfollowSuccessACActionType => ({
    type: UNFOLLOW,
    userId
})

type SetUsersACActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsersAC = (users: Array<UsersType>): SetUsersACActionType => ({
    type: SET_USERS,
    users
})

type SetCurrentPageACActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): SetCurrentPageACActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
}) // currentPage == currentPage: currentPage

type SetTotalUsersCountACActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountACActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
})

type ToggleIsFetchingACActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingACActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type ToggleFollowingProgressACActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgressAC = (
    isFetching: boolean,
    userId: number
): ToggleFollowingProgressACActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

// thunk creators ("thunk creator returns thunk")

type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsersThunkCreator = (requestedPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(requestedPage))

        const data = await usersAPI.getUsers(requestedPage, pageSize)
        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))
    }
}

const _followFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => FollowSuccessACActionType | UnfollowSuccessACActionType
) => {
    dispatch(toggleFollowingProgressAC(true, userId))

    const response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgressAC(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        _followFlow(dispatch, userId, apiMethod, followSuccessAC)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        _followFlow(dispatch, userId, apiMethod, unfollowSuccessAC)
    }
}

export default usersReducer
