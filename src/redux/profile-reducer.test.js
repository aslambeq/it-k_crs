import profileReducer, { addPostActionCreator, deletePostActionCreator } from './profile-reducer'

let state = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 0 },
        { id: 2, message: "It's my first post", likesCount: 10 },
        { id: 3, message: 'Lorem Ipsum is simply dummy text...', likesCount: 42 }
    ]
}

it('posts array lentgh should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator('sashenka')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postData.length).toBe(4)
})

it('message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator('sashenka')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postData[3].message).toBe('sashenka')
})

it('length of messages after deleting should be decremented', () => {
    // 1. test data
    let action = deletePostActionCreator(1)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postData.length).toBe(2)
})
