import React, { useContext, useEffect } from "react";
import { DatabaseContext } from "../context/database/databaseContext";
import { Loader } from "./Loading";
import { AdditorContext } from "../context/additor/additorContext";

export const List = () => {
  const additor = useContext(AdditorContext);
  const db = useContext(DatabaseContext);

  useEffect(() => {
    db.fetchUsers();
  }, []);

  const getPhrasesText = (phrases, index, id) => {
    return (
      <div style={{ paddingLeft: "0.75rem" }}>
        {phrases.map((phrase) => (
          <div key={phrase.id} className="mb-2 align-items-center">
            <span className="mb-0 opacity-75">{phrase.text}</span>
            <button
              type="button"
              className="btn btn-outline-light btn-delete rounded-1 border-0"
              onClick={() => {
                db.deletePhrase(phrase.id, index);
              }}
            >
              <img src={require("../icons/delete.png")} alt="delete" />
            </button>
          </div>
        ))}
        <div className="align-items-center d-flex">
          <span className="mb-0 opacity-75">Добавить фразу</span>
          <button
            onClick={() => {
              additor.show(index, id);
            }}
            type="button"
            className="btn btn-add rounded-1 btn-outline-light border-0"
          >
            <img src={require("../icons/add16.png")} alt="add" />
          </button>
        </div>
      </div>
    );
  };

  if (db.loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container p-4 justify-content-center">
        <div className="list-group">
          {db.users.map((user) => (
            <div className="list-group-item d-flex py-3 bg-white-gradient" key={user.id}>
              <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h6>
                    {user.id}. {user.name}
                  </h6>
                  {getPhrasesText(
                    user.phrases,
                    db.users.indexOf(user),
                    user.id
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      db.deleteUser(user.id);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
