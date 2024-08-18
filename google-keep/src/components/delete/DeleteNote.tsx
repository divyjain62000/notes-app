import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import { NoteInterface, NoteStateInterface } from '../../interfaces/note.interface';
import { removeNote, setNotes } from '../../context/Actions';


const mapStateToProps = (state: NoteStateInterface) => ({
    notes: state.notes,
    deleteNotes: state.deleteNotes
});

const mapDispatchToProps = {
    removeNote,
    setNotes
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


interface DeleteNodeProps extends PropsFromRedux {
    deleteNote: NoteInterface;
}



const StyledCard = styled(Card)`
    border: 1px solid #5f6368;
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: none;
  color: #ffe;
  cursor: pointer;
`

const DeleteNote: React.FC<DeleteNodeProps> = ({ deleteNote, deleteNotes, notes, setNotes, removeNote }) => {

    const restoreNote = (deleteNote: NoteInterface) => {
        const updatedNotes = deleteNotes.filter(data => data.id !== deleteNote.id);
        removeNote(updatedNotes);
        setNotes([deleteNote, ...notes]);
    }

    const removeNoteHandler = (deleteNote: NoteInterface) => {
        const updatedNotes = deleteNotes.filter(data => data.id !== deleteNote.id);
        removeNote(updatedNotes);
    }

    return (
        <StyledCard style={{ background: deleteNote.bgColor }}>
            {deleteNote.img !== null && typeof deleteNote.img === "string" && <div style={{ width: "100%", height: "30%" }}>
                <img src={deleteNote.img} alt="deleteNote-img" style={{ width: "100%", height: "100%" }} />
            </div>}
            <CardContent>
                <Typography style={{ fontWeight: "bold" }}>{deleteNote.heading}</Typography>
                <Typography>{deleteNote.text}</Typography>
            </CardContent>
            <CardActions>
                <Delete
                    fontSize="small"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => removeNoteHandler(deleteNote)}
                />
                <Restore
                    fontSize="small"
                    onClick={() => restoreNote(deleteNote)}
                />
            </CardActions>
        </StyledCard>
    )
}

export default connector(DeleteNote);