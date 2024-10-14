import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const NoteCard = ({ note }) => {
  return (
    <div className="border border-gray-300 shadow-lg p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{note.question}</h3>
      
      {/* Render content in order */}
      {note.content.length > 0 ? (
        note.content.map((item, index) => {
          if (item.type === "answer") {
            return <p key={index} className="mb-2">{item.value}</p>;
          } else if (item.type === "code") {
            return (
              <SyntaxHighlighter key={index} language="javascript">
                {item.value}
              </SyntaxHighlighter>
            );
          }
          return null; // In case of an unexpected type
        })
      ) : (
        <p className="text-gray-500">No content available.</p>
      )}
    </div>
  );
};

export default NoteCard;