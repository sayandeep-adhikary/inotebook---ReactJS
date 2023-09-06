import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, [])
  
  return (
    <>
      <Addnote />
      <div className='lg_text text-center mb-3'>Your Notes</div>
      <div className="container">
        <div className="row">
          {notes.map((note) => {
            return <Noteitem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
}
