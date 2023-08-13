import React, { useContext, useEffect } from "react";
import { DatabaseContext } from "../context/database/databaseContext";
import { Loader } from "./Loading";

const Table = () => {
  const db = useContext(DatabaseContext);
  useEffect(() => {
    db.fetchUsers();
  }, []);

  function getPhrasesText(obj) {
    if (obj.length === 0) {
      return "Нет фраз";
    }
    return (
      <div>
        {obj.map((spaning) => (
          <div className="my-2" key={spaning.id}>
            <span>{spaning.text}</span>
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
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Имя</th>
          <th>Активный</th>
          <th>Фразы</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        {db.users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.is_active ? "Да" : "Нет"}</td>
            <td>{getPhrasesText(user.phrases)}</td>
            <td>
              <button type="button" className="btn btn-outline-danger" onClick={() => {db.deleteUser(user.id)}}>
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
