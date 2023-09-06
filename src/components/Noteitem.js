import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function Noteitem(props) {
  const context = useContext(NoteContext);
  const { deletenote, editnote } = context;
  const {note} = props;
  return (
    <div className="col-md-4 col-sm-12 d-flex align-items-center justify-content-center my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{props.note.title}</h5>
            <div>
              <i
                className="fa-regular fa-trash-can mx-2"
                data-bs-toggle="tooltip"
                data-bs-title="Default tooltip"
                onClick={()=>deletenote(note._id)}
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-2"
                data-bs-toggle="tooltip"
                data-bs-title="Default tooltip"
                onClick={()=>editnote(note._id, "hello", "hello again", "indian")}
              ></i>
            </div>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Card subtitle
          </h6>
          <p className="card-text">{props.note.description}</p>
        </div>
      </div>
    </div>
  );
}
