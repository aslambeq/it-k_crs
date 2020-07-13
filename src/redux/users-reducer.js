import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../utils/object-helpers'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
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

// action creators

export const followSuccessAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccessAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const setCurrentPageAC = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
}) // currentPage == currentPage: currentPage
export const setTotalUsersCountAC = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
})
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgressAC = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

// thunk creators

export const getUsersThunkCreator = (requestedPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(requestedPage))

        const data = await usersAPI.getUsers(requestedPage, pageSize)
        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))
    }
}

const followFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgressAC(true, userId))

    const response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgressAC(false, userId))
}

export const follow = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        followFlow(dispatch, userId, apiMethod, followSuccessAC)
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        followFlow(dispatch, userId, apiMethod, unfollowSuccessAC)
    }
}

export default usersReducer
