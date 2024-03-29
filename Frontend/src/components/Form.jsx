import React, { useState, useContext, useEffect } from "react";
import { DatabaseContext } from "../context/database/databaseContext";
import axios from "axios";

const url = "http://127.0.0.1:8000";

const Form = () => {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [userDirty, setUserDirty] = useState(false);
  const [userError, setUserError] = useState("Это поле не может быть пустым");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(
    "Это поле не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);
  const db = useContext(DatabaseContext);
  const [inputType, setInputType] = useState('password')

  const submitHandler = async (event) => {
    event.preventDefault();
    db.addUser(nameValue, passwordValue)
      .then(() => {
        setNameValue("");
        setPasswordValue("");
        setUserDirty(false);
        setPasswordDirty(false);
        setUserError("Это поле не может быть пустым");
        setPasswordError("Это поле не может быть пустым");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const blurHandler = async (e) => {
    if (e.target.name === "user") {
      if (e.target.value) {
        const response = await axios.get(
          `${url}/users/name/${e.target.value}/`
        );
        if (response.data.detail === "User found") {
          setUserError("Это имя уже занято");
        } else {
          setUserError("");
        }
      } else {
        setUserError("Это поле не может быть пустым");
      }
      setUserDirty(true);
    } else {
      if (e.target.value) {
        setPasswordError("");
      } else {
        setPasswordError("Это поле не может быть пустым");
      }
      setPasswordDirty(true);
    }
  };

  const changeType = () => {
    if (inputType === "password") {
      setInputType("text")
    } else {
      setInputType("password")
    }
  }

  useEffect(() => {
    if (userError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userError, passwordError]);

  return (
    <div className="container mt-3 mb-3">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            autoComplete="off"
            name="user"
            onBlur={(e) => blurHandler(e)}
            type="text"
            className="form-control mt-3"
            placeholder="Имя пользователя"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>
        {userDirty && userError && (
          <div className="text-danger">{userError}</div>
        )}
        <div className="form-group position-relative">
          <button
          onClick={changeType}
            type="button"
            className="position-absolute top-50 end-0 btn-eye rounded-circle mx-1"
            style={{ transform: "translateY(-50%)" }}
          >
            <span>
              <i id="toggler" className="far fa-eye"></i>
            </span>
          </button>
          <input
            autoComplete="off"
            type={inputType}
            name="password"
            onBlur={(e) => blurHandler(e)}
            className="form-control mt-3"
            placeholder="Пароль"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </div>
        {passwordDirty && passwordError && (
          <div className="text-danger">{passwordError}</div>
        )}
        <button
          disabled={!formValid}
          type="submit"
          className="btn btn-primary mt-3"
        >
          Подтвердить
        </button>
      </form>
    </div>
  );
};
export default Form;
