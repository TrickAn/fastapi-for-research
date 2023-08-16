import { HIDE_ADDITOR, SHOW_ADDITOR } from "../types";

const handlers = {
    [SHOW_ADDITOR]: state => ({...state, show: true}),
    [HIDE_ADDITOR]: state => ({...state, show: false}),
    DEFAULT: state => state
}

export const AdditorReduser = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    console.log(handle(state, action))
    return handle(state, action)
}
