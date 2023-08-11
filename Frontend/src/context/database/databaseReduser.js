import { ADD_USER, DELETE_USER, FETCH_USERS } from "../types";

const handlers = {
    [FETCH_USERS]: (state, {payload}) => ({...state, users: payload}),
    [ADD_USER]: (state, {payload}) => ({...state, users: [...state.users, payload]}),
    [DELETE_USER]: (state, {payload}) => ({...state, users: state.users.filter(user => user.id !== payload)}),
    DEFAULT: state => state
}

export const DatabaseReduser = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}