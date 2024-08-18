// store.ts
import { createStore } from 'redux';
import notesReducer from './Reducers';


const store = createStore(notesReducer);

export default store;
