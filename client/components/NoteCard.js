import React from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Choose a theme

const NoteCard = ({ note }) => {
  return (
    <div className="border border-gray-300 shadow-lg p-4 md:p-6 rounded-lg mx-auto w-full">
      <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-3 text-left">{note.question}</h3>
      {note.content.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {note.content.map((item, index) => {
            if (item.type === "answer") {
              return (
                <div
                  key={index}
                  className="mb-2 text-lg md:text-base lg:text-lg"
                  dangerouslySetInnerHTML={{ __html: item.value }}
                />
              );
            } else if (item.type === "code") {
              return (
                <div key={index} className="mb-2">
                  <Highlight className="javascript"> {item.value} </Highlight>
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No content available.</p>
      )}
    </div>
  );
};

export default NoteCard;