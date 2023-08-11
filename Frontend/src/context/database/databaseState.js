import React, { useReducer } from "react";
import { DatabaseContext } from "./databaseContext";
import { DatabaseReduser } from "./databaseReduser";
import { ADD_USER, DELETE_USER, FETCH_USERS } from "../types";
import axios from "axios";

const url = "http://127.0.0.1:8000";

export const DatabaseState = ({ children }) => {
  const initialState = {
    users: [],
  };
  const [state, dispatch] = useReducer(DatabaseReduser, initialState);

  const fetchUsers = async () => {
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
    const res = await axios.post(`${url}/users/post`, user);

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
      paiload: id,
    });
  };

  return (
    <DatabaseContext.Provider
      value={{
        addUser,
        deleteUser,
        fetchUsers,
        users: state.users,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
