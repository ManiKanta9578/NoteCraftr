import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFormData, setFormData } from "@/store/slices/formSlice";
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const QuestionForm2 = ({ onSubmit, editing = false, handleCancel }) => {

    const formData = useSelector((state) => state.form);

    const dispatch = useDispatch();

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'code-block'],
            ['clean']
        ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'code-block'
    ];


    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormData({ name, value }))
    };

    const handleEditorChange = (content) => {
        dispatch(setFormData({ name: 'answer', value: content }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData);
        dispatch(resetFormData());
    };

    return (
        <div className="p-4 shadow-md rounded-md bg-inherit">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="technology" className="block font-bold mb-2">
                        Technology
                    </label>
                    <select
                        id="technology"
                        name="technology"
                        value={formData.technology}
                        onChange={handleChange}
                        className="w-full p-2 border bg-inherit rounded"
                    >
                        <option style={{ backgroundColor: 'gray' }} value="">Select Technology</option>
                        <option style={{ backgroundColor: 'gray' }} value="React">React</option>
                        <option style={{ backgroundColor: 'gray' }} value="Node">Node</option>
                        <option style={{ backgroundColor: 'gray' }} value="JavaScript">JavaScript</option>
                        <option style={{ backgroundColor: 'gray' }} value="JSOutput">JS Output QAs</option>
                        <option style={{ backgroundColor: 'gray' }} value="ReactMR">React MR QAs</option>
                        <option style={{ backgroundColor: 'gray' }} value="DSA">DSA</option>
                        <option style={{ backgroundColor: 'gray' }} value="CSS">CSS</option>
                        <option style={{ backgroundColor: 'gray' }} value="HTML">HTML</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="question" className="block font-bold mb-2"> Question </label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        placeholder="Enter the question"
                        className="w-full p-2 border bg-inherit rounded"
                    />
                </div>

                <div>
                    <label htmlFor="answer" className="block font-bold mb-2"> Answer </label>
                    {/* <EditorComponent
                        value={formData.answer}
                        onChange={handleEditorChange}
                        className="border border-gray-300 bg-inherit rounded-lg"
                    /> */}
                    <ReactQuill
                        value={formData.answer}
                        onChange={handleEditorChange}
                        placeholder="Answer"
                        modules={modules}
                        formats={formats}
                        className="border border-gray-300 bg-inherit rounded-lg"
                        // style={{ height: '400px', overflowY: 'auto' }}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    {editing && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-inherit px-4 py-2 rounded-md shadow hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                    >
                        {editing ? "Update" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuestionForm2;