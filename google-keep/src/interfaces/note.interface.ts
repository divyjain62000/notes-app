export interface NoteInterface {
    id: string;
    heading: string | null;
    text: string | null;
    bgColor: string;
    img: string | ArrayBuffer | null;
}


// Define the shape of the state
export interface NoteStateInterface {
    notes: NoteInterface[];
    archiveNotes: NoteInterface[];
    deleteNotes: NoteInterface[];
    pinNotes: NoteInterface[];
}

export interface AddNoteAction {
    type: 'ADD_NOTE';
    payload: NoteInterface;
}
export interface RemoveNoteAction {
    type: 'REMOVE_NOTE';
    payload: NoteInterface[];
}

export interface SetNoteAction {
    type: 'SET_NOTES';
    payload: NoteInterface[];
}

export interface ArchiveNoteAction {
    type: 'ARCHIVE_NOTE';
    payload: NoteInterface[];
}

export interface PinNoteAction {
    type: 'PIN_NOTE';
    payload: NoteInterface[];
}



export type NoteActions = AddNoteAction | RemoveNoteAction | SetNoteAction | ArchiveNoteAction | PinNoteAction;
