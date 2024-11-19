import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from './slices/loadingSlice';
import notesSlice from './slices/notesSlice';

const store = configureStore({
    reducer: {
        loading: loadingSlice,
        notes: notesSlice,
    }
})

export default store;