import React, { useReducer } from "react";
import { AdditorReduser } from "./additorReduser";
import { AdditorContext } from "./additorContext";
import { HIDE_ADDITOR, SHOW_ADDITOR } from "../types";

export const AdditorState = ({ children }) => {
  const initialState = {
    show: false,
  };
  const [state, dispatch] = useReducer(AdditorReduser, initialState);

  const show = (index, id) => {
    dispatch({ type: SHOW_ADDITOR, payload: { index: index, id: id } });
  };

  const hide = () => {
    dispatch({ type: HIDE_ADDITOR });
  };

  return (
    <AdditorContext.Provider value={{ show, hide, state: state }}>
      {children}
    </AdditorContext.Provider>
  );
};
