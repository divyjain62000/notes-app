import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import { archiveNote, removeNote, setNotes } from '../../context/Actions';
import { NoteInterface, NoteStateInterface } from '../../interfaces/note.interface';


const mapStateToProps = (state: NoteStateInterface) => ({
    notes: state.notes,
    deleteNotes: state.deleteNotes,
    archiveNotes: state.archiveNotes,
    
});

const mapDispatchToProps = {
    archiveNote,
    setNotes,
    removeNote
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


interface ArchiveNoteProps extends PropsFromRedux {
    archive: NoteInterface;
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

const Archive: React.FC<ArchiveNoteProps> = ({ archive, deleteNotes, removeNote, archiveNotes, archiveNote, notes, setNotes }) => {

    const unArchiveNote = (archive: NoteInterface) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        archiveNote(updatedNotes);
        setNotes([archive, ...notes]);
    }

    const deleteNote = (archive: NoteInterface) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        archiveNote(updatedNotes);
        removeNote([archive, ...deleteNotes]);
    }

    return (
        <StyledCard style={{ background: archive.bgColor }}>
            {archive.img !== null && typeof archive.img === "string" && <div style={{ width: "100%", height: "30%" }}>
                <img src={archive.img} alt="archive-img" style={{ width: "100%", height: "100%" }} />
            </div>}
            <CardContent>
                <Typography>{archive.heading}</Typography>
                <Typography>{archive.text}</Typography>
            </CardContent>
            <CardActions>
                <Unarchive
                    fontSize="small"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => unArchiveNote(archive)}
                />
                <Delete
                    fontSize="small"
                    onClick={() => deleteNote(archive)}
                />
            </CardActions>
        </StyledCard>
    )
}

export default connector(Archive);