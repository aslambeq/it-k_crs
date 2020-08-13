import { ResultCodesEnum, ResultCodeForCaptchaEnum } from '../api/api'
import { securityAPI } from '../api/security-api'
import { authAPI } from '../api/auth-api'
import { stopSubmit, FormAction } from 'redux-form'
import { BaseThunkType, InferActionsTypes } from './redux-store'
import { Action } from 'redux'

/* export type InitialStateTypeXXX = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaURL: string | null
} */

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null // if null -> captcha is not required
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

// action creators

export const actions = {
    setAuthUserData: (
        id: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    ) => ({ type: 'SN/AUTH/SET_USER_DATA', payload: { id, email, login, isAuth } } as const),
    getCaptchaURLSuccess: (captchaURL: string) =>
        ({ type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaURL } } as const)
}

// thunk creators (// return (promise) )

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.success) {
        let { id, email, login } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.success) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.captchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'err0r'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url
    dispatch(actions.getCaptchaURLSuccess(captchaURL))
}

export const logout = (): ThunkType => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>