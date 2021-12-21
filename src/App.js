import React, { useState, useEffect } from "react";
import "./App.css";
import { API, Storage } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listTodos } from "./graphql/queries";
import {
  createTodo as createTodoMutation,
  deleteTodo as deleteTodoMutation,
} from "./graphql/mutations";

import NotesInput from "./components/NotesInput/NotesInput";
import NotesList from "./components/NotesList/NotesList";

const initialFormState = { name: "", description: "" };

//Debugging function
async function callApi() {
  try {
    const data = await API.get("diceapi", "/items");
    console.log("data: ", data);
  } catch (err) {
    console.log("error: ", err);
  }
}
function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [diceRoll, setDiceRoll] = useState(false);

  useEffect(() => {
    callApi();
    fetchNotes();
  }, []);

  async function onFileSubmit(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }
  function onNameChange(e) {
    setFormData({ ...formData, name: e.target.value });
  }
  function onDescriptionChange(e) {
    setFormData({ ...formData, description: e.target.value });
  }
  function onDiceChange(e) {
    setDiceRoll(e.target.checked);
  }

  async function fetchNotes() {
    // Query the DynamoDB database for all the notes data.
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      })
    );
    setNotes(apiData.data.listTodos.items);
  }

  async function createTodo(event) {
    event.preventDefault();
    if (!formData.name || !formData.description) return;
    // Call LAMBDA function. Assign result to formdata.

    await API.graphql({
      query: createTodoMutation,
      variables: { input: formData },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([...notes, formData]);
    setFormData(initialFormState);
  }

  async function deleteTodo({ id }) {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({
      query: deleteTodoMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div className="App">
      <NotesInput
        onNameChange={onNameChange}
        onDescriptionChange={onDescriptionChange}
        onFileSubmit={onFileSubmit}
        onDiceChange={onDiceChange}
        diceRoll={diceRoll}
        createTodo={createTodo}
        formData={formData}
      />
      <NotesList notes={notes} deleteTodo={deleteTodo} />

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
