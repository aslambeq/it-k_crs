const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogsData: [
        { id: 1, name: 'Aslambeq' },
        { id: 2, name: 'Sasha' },
        { id: 3, name: 'Sereja' },
        { id: 4, name: 'Alesha' },
        { id: 5, name: 'Женечка' },
        { id: 6, name: 'Димарик' },
    ],
    messagesData: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How u doin?' },
        { id: 3, message: 'Yo' },
    ]

}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 6, message: body }]
            }
        }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer