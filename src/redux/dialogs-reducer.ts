const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogsDataType = {
    id: number
    name: string
}

type MessagesDataType = {
    id: number
    message: string
}

let initialState = {
    dialogsData: [
        { id: 1, name: 'Aslambeq' },
        { id: 2, name: 'Sasha' },
        { id: 3, name: 'Sereja' },
        { id: 4, name: 'Alesha' },
        { id: 5, name: 'Женечка' },
        { id: 6, name: 'Димарик' }
    ] as Array<DialogsDataType>,
    messagesData: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How u doin?' },
        { id: 3, message: 'Yo' }
    ] as Array<MessagesDataType>
}

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): initialStateType => {
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

// action creators

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer
