import React from "react";
import Form from "./components/Form";
import Navbar from "./components/NavBar";
import { DatabaseState } from "./context/database/databaseState";
import { List } from "./components/List";


const App = () => {

  return (
    <DatabaseState>
      <Navbar />
      <Form/>
      <List/>
    </DatabaseState>
  );
};

export default App;
