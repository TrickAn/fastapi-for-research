import React, { useReducer } from "react";
import { DatabaseContext } from "./databaseContext";
import { DatabaseReduser } from "./databaseReduser";
import { ADD_PHRASE, ADD_USER, DELETE_PHRASE, DELETE_USER, FETCH_USERS, SHOW_LOADING } from "../types";
import axios from "axios";

const url = "http://127.0.0.1:8000";

export const DatabaseState = ({ children }) => {
  const initialState = {
    users: [],
    loading: false
  };
  const [state, dispatch] = useReducer(DatabaseReduser, initialState);

  const showLoading = () => {
    dispatch({ type: SHOW_LOADING})
  }

  const fetchUsers = async () => {
    showLoading()
    const res = await axios.get(`${url}/users/`);
    const payload = res.data;
    dispatch({
      type: FETCH_USERS,
      payload,
    });
  };

  const addUser = async (name, password) => {
    const user = {
      name: name,
      password: password,
    };
    const res = await axios.post(`${url}/users/`, user);

    const payload = res.data;
    dispatch({
      type: ADD_USER,
      payload,
    });
  };

  const deleteUser = async (id) => {
    await axios.delete(`${url}/users/${id}/`);

    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  };

  const deletePhrase = async (phraseId, index) => {
    await axios.delete(`${url}/phrases/${phraseId}/`)

    dispatch({
      type: DELETE_PHRASE,
      payload: {"phraseId": phraseId, "index": index}
    })
  }

  const addPhrase = async (index, id, phrase) => {
    const res = await axios.post(`${url}/phrases/${id}/`, {"text": phrase})

    dispatch({
      type: ADD_PHRASE,
      payload: {"index": index, "phrase": res.data}
    })
  }

  return (
    <DatabaseContext.Provider
      value={{
        showLoading,
        addUser,
        deleteUser,
        fetchUsers,
        deletePhrase,
        addPhrase,
        loading: state.loading,
        users: state.users,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
