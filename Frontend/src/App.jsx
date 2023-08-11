import React from "react";
import Form from "./components/Form";
import Navbar from "./components/NavBar";
import { DatabaseState } from "./context/database/databaseState";
import Table from "./components/Table";


const App = () => {

  return (
    <DatabaseState>
      <Navbar />
      <Form/>
      <Table />
    </DatabaseState>
  );
};

export default App;
