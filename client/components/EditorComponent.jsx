import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditorComponent = ({ initialValue = '', onChange, value, className, ...props }) => {

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

    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            placeholder="Answer"
            modules={modules}
            formats={formats}
            className={className}
            style={{ height: '400px', overflowY: 'auto' }}
            {...props}
        />
    );
};

export default EditorComponent;