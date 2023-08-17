import React, { useContext, useState } from "react";
import { DatabaseContext } from "../context/database/databaseContext";
import { AdditorContext } from "../context/additor/additorContext";

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
  if (state.show === false) {
    return null;
  } else {
    return (
      <>
        <button
          type="button"
          className="bg-dark opacity-50 w-100 h-100 position-fixed z-1"
          style={{ top: 0, left: 0 }}
          onClick={() => {setPhrase(() => {hide()})}}
        ></button>
        <div
          className="bg-dark position-fixed z-2 rounded-3 p-3 pt-0"
          style={{
            width: "30%",
            top: "50%",
            left: "50%",
            marginTop: "-250px",
            marginLeft: "-320px",
            verticalAlign: "middle",
          }}
        >
          <button
            type="button"
            className="btn text-light"
            onClick={() => {
              setPhrase(() => {hide()})
            }}
          >
            &times;
          </button>
          <div className="bg-light p-2 rounded rounded-3">
            <form className="form-group" onSubmit={submitHandler}>
              <input
                value={phrase}
                type="text"
                className="form-control mb-3"
                placeholder="Введите фразу"
                autoFocus="autofocus"
                onChange={(e) => setPhrase(e.target.value)}
              />
              <button className="btn btn-primary">Добавить</button>
            </form>
          </div>
        </div>
      </>
    );
  }
};
