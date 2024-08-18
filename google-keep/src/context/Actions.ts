import { NoteInterface, NoteActions, NoteStateInterface } from "../interfaces/note.interface";


export const addNote = (note: NoteInterface): NoteActions => ({
    type: 'ADD_NOTE',
    payload: note
});

export const removeNote = (notes: NoteInterface[]): NoteActions => ({
    type: 'REMOVE_NOTE',
    payload: notes
});

export const setNotes = (notes: NoteInterface[]): NoteActions => ({
    type: 'SET_NOTES',
    payload: notes
});

export const archiveNote = (notes: NoteInterface[]): NoteActions => ({
    type: 'ARCHIVE_NOTE',
    payload: notes
});

export const pinNote = (notes: NoteInterface[]): NoteActions => ({
    type: 'PIN_NOTE',
    payload: notes
});
