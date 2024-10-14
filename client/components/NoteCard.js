import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const NoteCard = ({ note }) => {
  return (
    <div className=" bg-white border border-gray-200 shadow-lg p-6 rounded-lg mx-auto">
      <h3 className="text-2xl md:text-lg font-bold mb-4 text-gray-800">{note.question}</h3>
      {note.content.length > 0 ? (
        note.content.map((item, index) => {
          if (item.type === "answer") {
            return (
              <p key={index} className="mb-4 text-2xl md:text-lg text-gray-700 leading-relaxed">
                {item.value}
              </p>
            );
          } else if (item.type === "code") {
            return (
              <div key={index} className="mb-4">
                <SyntaxHighlighter
                  language="javascript"
                  customStyle={{
                    padding: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#f5f5f5",
                    fontSize: "14px",
                    overflowX: "auto",
                  }}
                >
                  {item.value}
                </SyntaxHighlighter>
              </div>
            );
          }
          return null;
        })
      ) : (
        <p className="text-gray-500 text-center">No content available.</p>
      )}
    </div>
  );
};

export default NoteCard;
