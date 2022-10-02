import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import axios from "axios";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    Delete(index).then((result) => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      } else if (result.status === 404) {
        console.log("Resouce not found. Object not deleted");
      }
    });
  }

  async function Delete(index) {
    try {
      return await axios.delete(
        `http://localhost:5001/users/${characters[index].id}`
      );
    } catch (error) {
      //just logging errors to the console
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
    });
  }, []);

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5001/users");
      return response.data.users_list;
    } catch (error) {
      //just logging errors to the console
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === 201)
        setCharacters([...characters, person]);
    });
  }

  async function makePostCall(person) {
    try {
      return await axios
        .post("http://localhost:5001/users", person)
        .then((response) => {
          setCharacters((characters) => [...characters, response.data]);
        });
    } catch (error) {
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
