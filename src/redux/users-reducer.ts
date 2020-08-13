import { Dispatch } from 'redux'
import { usersAPI } from '../api/users-api'
import type { UsersType } from '../types/types'
import { updateObjectInArray } from '../utils/object-helpers'
import { BaseThunkType, InferActionsTypes } from './redux-store'

// delete
// const FOLLOW = 'FOLLOW'
// const UNFOLLOW = 'UNFOLLOW'
// const SET_USERS = 'SET-USERS'
// const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
// const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
// const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'
// delete

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of user id's
}

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }
        case 'SN/USERS/SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
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

// action creators

export const actions = {
    followSuccessAC: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    unfollowSuccessAC: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    setUsersAC: (users: Array<UsersType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPageAC: (currentPage: number) =>
        ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage: currentPage } as const),
    // {currentPage} == {currentPage: currentPage}
    setTotalUsersCountAC: (totalUsersCount: number) =>
        ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetchingAC: (isFetching: boolean) =>
        ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgressAC: (isFetching: boolean, userId: number) =>
        ({
            type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
            isFetching,
            userId
        } as const)
}

// thunk creators ("thunk creator returns thunk")

export const getUsersThunkCreator = (requestedPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetchingAC(true))
        dispatch(actions.setCurrentPageAC(requestedPage))

        const data = await usersAPI.getUsers(requestedPage, pageSize)
        dispatch(actions.toggleIsFetchingAC(false))
        dispatch(actions.setUsersAC(data.items))
        dispatch(actions.setTotalUsersCountAC(data.totalCount))
    }
}

const _followFlow = async (
    dispatch: Dispatch<ActionTypes>,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionTypes
) => {
    dispatch(actions.toggleFollowingProgressAC(true, userId))

    const response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgressAC(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        _followFlow(dispatch, userId, apiMethod, actions.followSuccessAC)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        _followFlow(dispatch, userId, apiMethod, actions.unfollowSuccessAC)
    }
}

export default usersReducer

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>
