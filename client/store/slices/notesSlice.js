import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    data: []
})

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.data = action.payload;
        },
    }
});

export const { setNotes } = notesSlice.actions;

export default notesSlice.reducer;