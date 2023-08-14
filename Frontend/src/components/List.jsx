import React, { useContext, useEffect } from "react";
import { DatabaseContext } from "../context/database/databaseContext";
import { Loader } from "./Loading";

export const List = () => {
  const db = useContext(DatabaseContext);
  useEffect(() => {
    db.fetchUsers();
  }, []);

  function getPhrasesText(phrases) {
    if (phrases.length === 0) {
      return (
        <span className="mb-0 opacity-75" style={{paddingLeft: "0.75rem"}}>Нет фраз</span>
      );
    }
    return (
      <div style={{paddingLeft: "0.75rem"}}>
        {phrases.map((phrase) => (
          <div key={phrase.id} className="mb-2">
            <span className="mb-0 opacity-75">{phrase.text}</span>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              style={{ marginLeft: "0.7vw" }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (db.loading) {
    return <Loader />;
  }

  return (
    <div className="container p-4 justify-content-center">
      <div className="list-group">
        {db.users.map((user) => (
          <div className="list-group-item d-flex py-3" key={user.id}>
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6>{user.id}. {user.name}</h6>
              {getPhrasesText(user.phrases)}
            </div>
            <div>
              <button type="button" className="btn btn-outline-danger" onClick={() => {db.deleteUser(user.id)}}>
                Удалить
              </button>
            </div>
          </div>
        </div>
        ))}
        

      </div>
    </div>
  );
};
