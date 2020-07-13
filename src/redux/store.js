import dialogsReducer from './dialogs-reducer';
import profileReducer from "./profile-reducer";
import sidebarReducer from './sidebar-reducer';


let store = {
    _state: {
        profilePage: {
            postData: [
                { id: 1, message: 'Hi, how are you?', likesCount: 0 },
                { id: 2, message: 'It\'s my first post', likesCount: 10 },
                { id: 3, message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', likesCount: 42 },
            ],
            newPostText: ''
        },
        dialogsPage: {
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
            ],
            newMessageBody: ''

        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('state was changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}



export default store;

// 'store' - OOP
window.store = store;

// action { type: 'ADD-POST', ... }