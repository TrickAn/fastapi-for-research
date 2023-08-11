import React, { useContext, useEffect } from "react";
import { DatabaseContext } from "../context/database/databaseContext";

const Table = () => {
  const { users, fetchUsers } = useContext(DatabaseContext);
  useEffect(() => {
    fetchUsers();
  }, []);

  function getPhrasesText(obj) {
    if (obj.length === 0) {
      return "No phrases";
    }
    return (
      <div>
        {obj.map((spaning) => (
          <span style={{display: "block"}} key={spaning.id}>{spaning.text}</span>
        ))}
      </div>
    );
  }

  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>User</th>
          <th>Active</th>
          <th>Phrases</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.is_active ? "Yes" : "No"}</td>
            <td>{getPhrasesText(user.phrases)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
