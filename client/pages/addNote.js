import React, { useState, useEffect } from 'react';
import { createNote } from '../services/api';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { loadingShow } from '@/store/slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddNote = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ReactQuill configuration for toolbar
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

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    technology: Yup.string().required('Technology is required'),
    fields: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required(),
        value: Yup.string().required('Field value is required')
      })
    )
  });

  const handleSubmit = async (values, { resetForm }) => {
    dispatch(loadingShow(true));

    const cleanedFields = values.fields.filter((field) => {
      if (field.type === 'answer') {
        return field.value !== '<p><br></p>' && field.value.trim() !== '';
      }
      return field.value.trim() !== '';
    });

    const content = cleanedFields.map((field) => ({
      type: field.type,
      value: field.value
    }));

    await createNote({
      question: values.question,
      content,
      technology: values.technology
    });

    dispatch(loadingShow(false));
    resetForm();
  };

  return (
    <div className="mx-auto h-screen p-6 shadow-lg rounded-lg mt-16">
      <h1 className="text-2xl font-semibold mb-4">Add New Note</h1>
      <Formik
        initialValues={{
          question: '',
          technology: '',
          fields: [{ type: 'answer', value: '' }]
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            {/* Technology Dropdown */}
            <div className="mb-4">
              <Field
                as="select"
                name="technology"
                className="w-full border border-gray-300 bg-inherit p-2 mb-4 rounded-lg"
              >
                <option value="">Select Technology</option>
                <option value="React">React</option>
                <option value="Node">Node</option>
                <option value="JavaScript">JavaScript</option>
                <option value="JSOutput">JS Output QAs</option>
                <option value="ReactMR">React MR QAs</option>
                <option value="DSA">DSA</option>
                <option value="CSS">CSS</option>
                <option value="HTML">HTML</option>
              </Field>
              {errors.technology && touched.technology && (
                <div className="text-red-500">{errors.technology}</div>
              )}
            </div>

            {/* Question Input */}
            <div className="mb-4">
              <Field
                name="question"
                placeholder="Question"
                className="w-full border border-gray-300 bg-inherit p-2 mb-4 rounded-lg"
              />
              {errors.question && touched.question && (
                <div className="text-red-500">{errors.question}</div>
              )}
            </div>

            {/* Fields for Answer/Code */}
            <FieldArray name="fields">
              {({ remove, push }) => (
                <div>
                  {values.fields.map((field, index) => (
                    <div key={index} className="mb-4">
                      {field.type === 'answer' ? (
                        <div>
                          {mounted && (
                            <ReactQuill
                              value={field.value}
                              onChange={(value) =>
                                setFieldValue(`fields[${index}].value`, value)
                              }
                              placeholder="Answer"
                              modules={modules}
                              formats={formats}
                              className="border border-gray-300 bg-inherit rounded-lg mb-2"
                            />
                          )}
                          {/* <button type="button" onClick={() => remove(index)} className="text-red-500" > Remove </button> */}
                        </div>
                      ) : (
                        <div>
                          <Field
                            as="textarea"
                            name={`fields[${index}].value`}
                            placeholder="Code"
                            className="w-full border border-gray-300 bg-inherit p-2 rounded-lg mb-2"
                          />
                          <button type="button" onClick={() => remove(index)} className="text-red-500" > Remove </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Buttons to Add Fields */}
                  {/* <div className="flex space-x-4 mb-4">
                    <button
                      type="button"
                      onClick={() => push({ type: 'answer', value: '' })}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Add Answer
                    </button>
                    <button
                      type="button"
                      onClick={() => push({ type: 'code', value: '' })}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Add Code
                    </button>
                  </div> */}
                </div>
              )}
            </FieldArray>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-lg ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
            >
              {isLoading ? 'Submitting...' : 'Add Note'}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNote;
