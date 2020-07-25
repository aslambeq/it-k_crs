import { authAPI, securityAPI, ResultCodesEnum, ResultCodeForCaptcha } from '../api/api'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'

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

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

// action creators

type SetAuthUserDataActionPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth }
})

type GetCaptchaURLSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaURL: string }
}

export const getCaptchaURLSuccess = (captchaURL: string): GetCaptchaURLSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaURL }
})

// thunk creators (// return (promise) )

export const getAuthUserData = () => async (dispatch: any) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.success) {
        let { id, email, login } = meData.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.success) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.captchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'err0r'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const getCaptchaURL = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaURL()
    const captchaURL = response.data.url
    dispatch(getCaptchaURLSuccess(captchaURL))
}

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer
