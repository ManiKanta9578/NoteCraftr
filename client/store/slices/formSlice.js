import { createSlice } from "@reduxjs/toolkit"

const formSlice = createSlice({
    name: 'form',
    initialState: {
        technology: "",
        question: "",
        answer: "",
    },
    reducers: {
        setFormData: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        editFormData: (state, action) => {
            const { technology, question, answer } = action.payload;
            state.technology = technology || "";
            state.question = question || "";
            state.answer = answer || "";
        },
        resetFormData: (state) => ({
            ...state,
            question: "",
            answer: "",
        }),
    }
});

export const { setFormData, resetFormData, editFormData } = formSlice.actions;

export default formSlice.reducer;