import { ADD_USER, DELETE_USER, FETCH_USERS, SHOW_LOADING } from "../types";

const handlers = {
    [SHOW_LOADING]: state => ({...state, loading: true}),
    [FETCH_USERS]: (state, {payload}) => ({...state, users: payload, loading: false}),
    [ADD_USER]: (state, {payload}) => ({...state, users: [...state.users, payload]}),
    [DELETE_USER]: (state, {payload}) => ({...state, users: state.users.filter(user => user.id !== payload)}),
    DEFAULT: state => state
}

export const DatabaseReduser = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}