import { ADD_PHRASE, ADD_USER, DELETE_PHRASE, DELETE_USER, FETCH_USERS, SHOW_LOADING } from "../types";

const deletePhrase = (users, phraseId, index) => {
    users[index].phrases = users[index].phrases.filter(phrase => phrase.id !== phraseId)
    return users
  }

const addPhrase = (users, index, phrase) => {
    users[index].phrases.push(phrase)
    return users
} 

const handlers = {
    [SHOW_LOADING]: state => ({...state, loading: true}),
    [FETCH_USERS]: (state, {payload}) => ({...state, users: payload, loading: false}),
    [ADD_USER]: (state, {payload}) => ({...state, users: [...state.users, payload]}),
    [DELETE_USER]: (state, {payload}) => ({...state, users: state.users.filter(user => user.id !== payload)}),
    [DELETE_PHRASE]: (state, {payload}) => ({...state, users: deletePhrase(state.users, payload.phraseId, payload.index)}),
    [ADD_PHRASE]: (state, {payload}) => ({...state, users: addPhrase(state.users, payload.index, payload.phrase)})
}

export const DatabaseReduser = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    console.log(handle(state, action))
    return handle(state, action)
}