import { NoteStateInterface, NoteActions } from './../interfaces/note.interface';


const initialState: NoteStateInterface = {
    notes: [],
    archiveNotes: [],
    deleteNotes: [],
    pinNotes: []
}

const notesReducer = (
    state = initialState,
    action: NoteActions
): NoteStateInterface => {

    switch (action.type) {
        case 'ADD_NOTE':
            return { ...state, notes: [...state.notes, action.payload] };
        case 'SET_NOTES':
            return { ...state, notes: action.payload }
        case 'REMOVE_NOTE':
            return { ...state, deleteNotes: action.payload }
        case 'ARCHIVE_NOTE':
            return { ...state, archiveNotes: action.payload }
        case 'PIN_NOTE':
            return { ...state, pinNotes: action.payload }
        default:
     
        return state;
    }
}

export default notesReducer;