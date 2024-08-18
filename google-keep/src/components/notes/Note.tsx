import React from 'react';
import { useState } from "react";

import { Card, CardContent, CardActions, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  PushPin as Pin
} from "@mui/icons-material";

import { NoteInterface, NoteStateInterface } from '../../interfaces/note.interface';
import { connect, ConnectedProps } from 'react-redux';
import { archiveNote, pinNote, removeNote, setNotes } from '../../context/Actions';

const mapStateToProps = (state: NoteStateInterface) => ({
  notes: state.notes,
  deleteNotes: state.deleteNotes,
  archiveNotes: state.archiveNotes,
  pinNotes: state.pinNotes
});

const mapDispatchToProps = {
  removeNote,
  setNotes,
  archiveNote,
  pinNote
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


interface NotesProps extends PropsFromRedux {
  note: NoteInterface
}



const StyledCard = styled(Card)`
  border: 1px solid #5f6368;
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: none;
  color: #ffe;
  cursor: pointer;
`;


const Note: React.FC<NotesProps> = ({ note, notes, pinNote, pinNotes, deleteNotes, archiveNotes, archiveNote, setNotes, removeNote }) => {
  const [isCardActionVisible, setIsCardActionVisible] = useState<boolean>(false);


  const pinNoteHandler = (note: NoteInterface) => {
    const updatedNotes = notes.filter((data: NoteInterface) => data.id !== note.id);
    setNotes(updatedNotes);
    pinNote([note, ...pinNotes]);
  };


  const archiveNoteHandler = (note: NoteInterface) => {
    const updatedNotes = notes.filter((data: NoteInterface) => data.id !== note.id);
    setNotes(updatedNotes);
    archiveNote([note, ...archiveNotes]);
  };

  const deleteNote = (note: NoteInterface) => {
    const updatedNotes = notes.filter((data: NoteInterface) => data.id !== note.id);
    setNotes(updatedNotes);
    removeNote([...deleteNotes, note]);
  };

  console.log(note.text);

  return (
    <StyledCard
      onMouseEnter={() => {
        setIsCardActionVisible(true);
        console.log("enter");
      }}
      onMouseLeave={() => setIsCardActionVisible(false)}
      style={{ background: note.bgColor }}
    >
      {note.img !== null && typeof note.img === "string" && <div style={{ width: "100%", height: "30%" }}>
        <img src={note.img} alt="note-img" style={{ width: "100%", height: "100%" }} />
      </div>}
      <CardContent>

        <Typography style={{ fontWeight: "bold" }}>{note.heading}</Typography>
        <Typography
          style={{
            whiteSpace: "pre-line", // Ensures line breaks are preserved
            fontWeight: "lighter"
          }}
        >
          {note.text}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          visibility: `${isCardActionVisible ? "visible" : "hidden"}`,
        }}
      >
        <Pin
          fontSize="small"
          style={{ marginLeft: "auto" }}
          onClick={() => pinNoteHandler(note)}
        />
        <Archive
          fontSize="small"
          onClick={() => archiveNoteHandler(note)}
        />
        <Delete fontSize="small" onClick={() => deleteNote(note)} />
      </CardActions>
    </StyledCard>
  );
};

export default connector(Note);
