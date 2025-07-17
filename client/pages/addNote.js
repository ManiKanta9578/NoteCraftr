import { createNote } from "@/services/api";
import { useState } from "react";

import dynamic from 'next/dynamic';
const FormWithRichEditor = dynamic(() => import('@/components/ReactQuill'), { ssr: false });

const AddNote = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        // Simulate API call
        await createNote(data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Creating your note...</p>
                </div>
            </div>
        );
    }

    return <FormWithRichEditor onSubmit={onSubmit} />;
};

export default AddNote;