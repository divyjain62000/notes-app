import React from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../utils/common-utils';

//components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';
import { NoteInterface, NoteStateInterface } from '../../interfaces/note.interface';
import { connect, ConnectedProps } from 'react-redux';
import { addNote, pinNote, removeNote, setNotes } from '../../context/Actions';
import PinNote from './PinNote';


const mapStateToProps = (state: NoteStateInterface) => ({
    notes: state.notes,
    pinNotes: state.pinNotes
});

const mapDispatchToProps = {
    setNotes
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;



const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes: React.FC<PropsFromRedux> = ({ notes, pinNotes, setNotes }) => {


    const onDragEnd = (result: DropResult) => {
        if (!result.destination)
            return;
        const reorderedItems = Array.from(notes);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        setNotes(reorderedItems);

    }

    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: "center" }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                <div style={{ marginTop: "40px" }}>
                    {(pinNotes && pinNotes.length > 0) &&
                        <>
                            <div style={{ width: "100%", color: "#ffe", fontSize: "large" }}>Pinned</div>

                            <Grid
                                container
                                spacing={2}

                            >
                                {
                                    pinNotes.map((note, index) => {
                                        return (
                                            <Grid
                                                item
                                            >
                                                <PinNote note={note} />
                                            </Grid>

                                        )
                                    })
                                }
                            </Grid>
                        </>}
                </div>

                <div style={{ margin: "40px" }}></div>

                {(notes.length > 0 || pinNotes.length>0) ?
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <Grid
                                    container
                                    spacing={2}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {
                                        notes.map((note, index) => (
                                            <Draggable key={note.id} draggableId={note.id} index={index}>
                                                {(provided) => (
                                                    <Grid
                                                        style={{ display: 'absolute' }}
                                                        item
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Note note={note} />
                                                    </Grid>
                                                )}
                                            </Draggable >
                                        ))
                                    }
                                </Grid>
                            )}
                        </Droppable >
                    </DragDropContext>
                    : <EmptyNotes />}
            </Box>
        </Box>
    )
}

export default connector(Notes);