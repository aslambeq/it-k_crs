import { InferActionsTypes } from './redux-store'

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

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE': {
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

export const actions = {
    sendMessage: (newMessageBody: string) =>
        ({ type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody } as const)
}

export default dialogsReducer

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>