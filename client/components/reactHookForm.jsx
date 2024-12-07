import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import EditorComponent from "./EditorComponent";

function QuestionForm({ onSubmit, initialData, handleCancel, editing, formReset }) {
  const { register, handleSubmit, setValue, control, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (initialData) {
      setValue('technology', initialData.technology);
      setValue('question', initialData.question);
      setValue('answer', initialData.answer);
    }
  }, [initialData, setValue]);

  // Expose the `reset` function to the parent component
  useEffect(() => {
    if (formReset) {
      formReset(reset);
    }
  }, [formReset, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-inherit rounded shadow-md">
      {/* Technology Field */}
      <div className="mb-4">
        <label htmlFor="technology" className="block font-bold mb-2">Technology</label>
        <select
          {...register('technology', { required: 'Technology is required' })}
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
        {errors.technology && (
          <p className="text-red-500">{errors.technology.message}</p>
        )}
      </div>

      {/* Question Field */}
      <div className="mb-4">
        <label htmlFor="question" className="block font-bold mb-2">Question</label>
        <input
          {...register('question', { required: 'Question is required' })}
          className="w-full p-2 border bg-inherit rounded"
        />
        {errors.question && <p className="text-red-500">{errors.question.message}</p>}
      </div>

      {/* Answer Field with EditorComponent */}
      <div className="mb-4">
        <label htmlFor="answer" className="block font-bold mb-2">Answer</label>
        <Controller
          name="answer"
          control={control}
          rules={{ required: 'Answer is required' }}
          render={({ field }) => (
            <EditorComponent
              value={field.value || ''}
              onChange={field.onChange}
              className="border border-gray-300 bg-inherit rounded-lg"
            />
          )}
        />
        {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editing ? "Update" : "Submit"}</button>
      {editing &&
        <button type='button' onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
          Cancel
        </button>
      }
    </form>
  );
}

export default QuestionForm;