import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetFormData, setFormData } from '@/store/slices/formSlice';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function FormWithRichEditor({ onSubmit, setEditingId, isEditing }) {

  const dispatch = useDispatch();
  const formData = useSelector(state => state.form);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name, value }));
  };

  const handleRichTextChange = (content) => {
    dispatch(setFormData({ name: "answer", value: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    dispatch(resetFormData());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-inherit rounded shadow-md">
      <div>
        <label htmlFor="technology" className="block text-sm font-medium"> Technology </label>
        <select
          id="technology"
          name="technology"
          value={formData?.technology}
          onChange={handleInputChange}
          className="mt-1 block p-2 w-full rounded-md bg-inherit border border-gray-300 shadow-sm sm:text-sm"
        >
          <option style={{ backgroundColor: 'gray' }} value=""> Select Technology </option>
          <option style={{ backgroundColor: 'gray' }} value="React">React </option>
          <option style={{ backgroundColor: 'gray' }} value="Node">Node </option>
          <option style={{ backgroundColor: 'gray' }} value="JavaScript">JavaScript </option>
          <option style={{ backgroundColor: 'gray' }} value="JSOutput">JS Output QAs </option>
          <option style={{ backgroundColor: 'gray' }} value="ReactMR">React MR QAs </option>
          <option style={{ backgroundColor: 'gray' }} value="DSA">DSA </option>
          <option style={{ backgroundColor: 'gray' }} value="CSS">CSS </option>
          <option style={{ backgroundColor: 'gray' }} value="HTML">HTML </option>
        </select>
      </div>

      <div>
        <label htmlFor="question" className="block text-sm font-medium"> Question </label>
        <input
          id="question"
          name="question"
          type="text"
          value={formData?.question}
          onChange={handleInputChange}
          className="mt-1 block p-2 w-full rounded-md bg-inherit border border-gray-300 shadow-sm sm:text-sm"
          placeholder="Enter text here"
        />
      </div>

      <div className="h-[300px]">
        <label htmlFor="richEditor" className="block text-sm font-medium"> Answer </label>
        <div className="mt-1">
          <ReactQuill
            value={formData.answer}
            onChange={handleRichTextChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['code-block', 'blockquote'],
                ['link', 'image'],
                ['clean'],
              ],
            }}
            formats={['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'code-block', 'blockquote', 'link', 'image']}
            theme="snow"
            className="bg-inherit h-[230px]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => { isEditing ? setEditingId(null) : dispatch(resetFormData()) }}
          type="button"
          className="w-20 rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {isEditing ? "Cancel" : "Clear"}
        </button>
        <button
          type="submit"
          className="w-20 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
}