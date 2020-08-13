import Axios, { AxiosResponse } from 'axios'
import { ProfileType, UsersType } from '../types/types'

export const instance = Axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'e5603a0b-e3f4-4903-a58c-f9c68e2df4b5'
    }
})

// export const profileAPI

export enum ResultCodesEnum {
    success = 0,
    error = 1
}
export enum ResultCodeForCaptchaEnum {
    captchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
