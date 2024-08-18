import React from 'react';
import { useState } from "react";

import { Card, CardContent, CardActions, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
    ArchiveOutlined as Archive,
    DeleteOutlineOutlined as Delete,
    PushPinOutlined as Unpin
} from "@mui/icons-material";


import { connect, ConnectedProps } from 'react-redux';
import { archiveNote, pinNote, removeNote, setNotes } from '../../context/Actions';
import { NoteInterface, NoteStateInterface } from '../../interfaces/note.interface';

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


interface PinNotesProps extends PropsFromRedux {
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


const PinNote: React.FC<PinNotesProps> = ({ note, notes, deleteNotes, archiveNotes, archiveNote, setNotes, removeNote,pinNote,pinNotes }) => {
    const [isCardActionVisible, setIsCardActionVisible] = useState<boolean>(false);

    const unpinNoteHandler = (note: NoteInterface) => {
        const updatedNotes = pinNotes.filter((data: NoteInterface) => data.id !== note.id);
        pinNote(updatedNotes);
        setNotes([note, ...notes]);
    };


    const archiveNoteHandler = (note: NoteInterface) => {
        const updatedNotes = pinNotes.filter((data: NoteInterface) => data.id !== note.id);
        pinNote(updatedNotes);
        archiveNote([note, ...archiveNotes]);
    };

    const deleteNote = (note: NoteInterface) => {
        const updatedNotes = pinNotes.filter((data: NoteInterface) => data.id !== note.id);
        pinNote(updatedNotes);
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
                <Unpin
                    fontSize="small"
                    style={{ marginLeft: "auto" }}
                    onClick={() => unpinNoteHandler(note)}
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

export default connector(PinNote);
