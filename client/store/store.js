import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from './slices/loadingSlice';
import notesSlice from './slices/notesSlice';
import formReducer from './slices/formSlice';

const store = configureStore({
    reducer: {
        loading: loadingSlice,
        notes: notesSlice,
        form: formReducer,
    }
})

export default store;