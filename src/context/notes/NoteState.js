import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNWZiMDYwZWZiMWQ4YmMzZjFkZTcwIn0sImlhdCI6MTY5Mzg0OTI2M30.DQRcjza6LoGD_s5RBGLwsjCoA4QRJeG_3iD2y-IdXoM",
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNWZiMDYwZWZiMWQ4YmMzZjFkZTcwIn0sImlhdCI6MTY5Mzg0OTI2M30.DQRcjza6LoGD_s5RBGLwsjCoA4QRJeG_3iD2y-IdXoM",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = {
      _id: "64f6d9fa9b0ac5b6c27415d569",
      user: "64f5fb060efb1d8bc3f1de70",
      title: title,
      description: description,
      tag: tag,
      date: "2023-09-05T07:34:18.479Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Delete a note
  const deletenote = (id) => {
    setNotes(notes.filter((note) => id !== note._id));
  };
  // Edit a note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmNWZiMDYwZWZiMWQ4YmMzZjFkZTcwIn0sImlhdCI6MTY5Mzg0OTI2M30.DQRcjza6LoGD_s5RBGLwsjCoA4QRJeG_3iD2y-IdXoM",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
