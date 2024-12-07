import React, { useEffect } from "react";
import { createNote } from "../services/api";
import { useDispatch } from "react-redux";
import { loadingShow } from "@/store/slices/loadingSlice";
import QuestionForm2 from "@/components/Form";
import { resetFormData } from "@/store/slices/formSlice";

const AddNote = () => {
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        dispatch(loadingShow(true));
        await createNote(data);
        dispatch(loadingShow(false));
    };

    useEffect(() => {
        dispatch(resetFormData());
    }, []);

    return (
        <div className="mx-auto h-screen p-3 shadow-lg rounded-lg mt-12">
            <h1 className="text-2xl font-semibold mb-2 text-center">Add New Note</h1>
            <QuestionForm2 onSubmit={onSubmit} />
        </div>
    );
};

export default AddNote;