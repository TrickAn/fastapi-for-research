import React, { useState, useContext } from "react";
import { DatabaseContext } from "../context/database/databaseContext";

const Form = () => {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const db = useContext(DatabaseContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    db.addUser(nameValue, passwordValue)
    .then(() => {
      setNameValue('')
      setPasswordValue('')
    })
    .catch((error) => {
      console.log(error.response.data)
    })
    
  };

  return (
    <div className="container mt-3 mb-3">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Имя пользователя"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Пароль"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Подтвердить
        </button>
      </form>
    </div>
  );
};
export default Form;
