import React, { useContext, useEffect, useState } from "react";
import { AdditorContext } from "../context/additor/additorContext";
import { DatabaseContext } from "../context/database/databaseContext";
import close from "../icons/close24.png"

export const PhraseAdditor = () => {
  const [phrase, setPhrase] = useState("");
  const [pharseError, setError] = useState("Это поле не может быть пустым");
  const [errorShow, setErrorShow] = useState(false);
  const { addPhrase } = useContext(DatabaseContext);
  const { state, hide } = useContext(AdditorContext);

  useEffect(() => {
    setErrorShow(false)
    setPhrase("");
    setError("Это поле не может быть пустым");
  }, [state])

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!phrase) {
      setErrorShow(true)
    } else { 
      addPhrase(state.index, state.id, phrase);
      hideElem()
    }
  };

  const hideElem = () => {
    hide();
  };

  if (!state.show) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => {
          hideElem();
        }}
        className="btn-tinted"
      ></button>
      <div
        className="position-fixed d-flex top-0 left-0 z-2"
        style={{
          marginTop: "300px",
          marginLeft: "calc(50% - 250px)",
        }}
      >
        <div
          className="bg-white rounded-3 p-3 pt-5 position-relative"
          style={{ minWidth: "500px" }}
        >
          <button
            onClick={() => {
              hideElem();
            }}
            type="button"
            className="btn-close-additor position-absolute"
            style={{ right: "3px", top: "3px" }}
          >
            <img src={close} alt="close" />
          </button>
          <form className="form-group" onSubmit={submitHandler}>
            <input
              type="text"
              className="form-control"
              placeholder="Введите фразу"
              autoFocus="autofocus"
              onChange={(e) => setPhrase(e.target.value)}
            />
            {pharseError && errorShow && (
              <div className="text-danger position-absolute">{pharseError}</div>
            )}
            <button className="btn btn-primary mt-4">Добавить</button>
          </form>
        </div>
      </div>
    </>
  );
};
