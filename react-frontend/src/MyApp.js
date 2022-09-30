import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import axios from "axios";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  useEffect(() => {
    fectchAll().then((result) => {
      if (result) 
          setCharacters(result);
    });
  }, []);

  async function fectchAll() {
    try {
      const response = await axios.get("http//localhost:5001/users");
      return response.data.users_list;
    } catch (error) {
      //just logging errors to the console
      console.log(error);
      return false;
    }
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
