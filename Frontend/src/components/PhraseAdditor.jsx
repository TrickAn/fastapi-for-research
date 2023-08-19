import React, { useContext, useState } from "react";
import { AdditorContext } from "../context/additor/additorContext";
import { DatabaseContext } from "../context/database/databaseContext";

export const PhraseAdditor = () => {
  const [phrase, setPhrase] = useState("");
  const { addPhrase } = useContext(DatabaseContext);
  const { state, hide } = useContext(AdditorContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    addPhrase(state.index, state.id, phrase)
    setPhrase("")
    hide()

  

  };

const hideElem = () => {
    setPhrase("")
    hide()
  }

  if (!state.show) {
    return null
  }

  return (
    <div
      className="position-fixed w-100 h-100 z-2 d-flex align-items-center justify-content-center top-0 left-0"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="bg-white rounded-3 p-3 pt-5 position-relative" style={{minWidth: "500px"}}>
        <button onClick={() => {hideElem()}} type="button" className="btn btn-outline-secondary text-dark position-absolute" style={{right: "3px", top: "3px"}}>
          &times;
        </button>
          <form className="form-group" onSubmit={submitHandler}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Введите фразу"
              autoFocus="autofocus"
              onChange={(e) => setPhrase(e.target.value)}
            />
            <button className="btn btn-primary">Добавить</button>
          </form>

      </div>
    </div>
  );
};
