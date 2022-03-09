import { createStore } from 'redux'
import { User } from '../db/models/User'

export interface InitialState {
    currentUser?: User
}

interface Action {
    type: String,
    payload: any
}

const initialState: InitialState = {}

const reducer = (state: InitialState = initialState, action: Action): InitialState => {
    switch(action.type) {
        case 'UPDATE_USER':
            return { ...state, currentUser: action.payload }
        default:
            return state
    }
}

const store = createStore(reducer)

export default store