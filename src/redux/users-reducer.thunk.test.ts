import { APIResponseType, ResultCodesEnum } from '../api/api'
import { usersAPI } from '../api/users-api'
import { actions, follow, unfollow } from './users-reducer'

jest.mock('../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})

const result: APIResponseType = {
    resultCode: ResultCodesEnum.success,
    messages: [],
    data: {}
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('follow thunk success', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccessAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgressAC(false, 1))
})

test('unfollow thunk success', async () => {
    const thunk = unfollow(1)
    
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccessAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgressAC(false, 1))
})
