import React from "react";
import Form from "./components/Form";
import Navbar from "./components/NavBar";
import { DatabaseState } from "./context/database/databaseState";
import { List } from "./components/List";
import { AdditorState } from "./context/additor/AdditorState";
import { PhraseAdditor } from "./components/PhraseAdditor";
import "./index.css"

const App = () => {
  return (
    <DatabaseState>
      <Navbar />
      <Form/>
      <AdditorState>
        <List/>
        <PhraseAdditor/>
      </AdditorState>
      <div style={{marginBottom: "600px"}}></div>
    </DatabaseState>
  );
};

export default App;
