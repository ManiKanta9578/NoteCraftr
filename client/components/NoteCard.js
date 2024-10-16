import React from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Choose a theme

const NoteCard = ({ note }) => {
  return (
    <div className="border border-gray-300 shadow-lg p-4 rounded-lg mx-auto">
      <h3 className="text-3xl md:text-xl font-semibold mb-3 text-left">{note.question}</h3>
      {note.content.length > 0 ? (
        note.content.map((item, index) => {
          if (item.type === "answer") {
            return (
              <div
                key={index}
                className="mb-2 text-3xl md:text-lg"
                dangerouslySetInnerHTML={{ __html: item.value }}
              />
            );
          } else if (item.type === "code") {
            return (
              <Highlight key={index} className="javascript">
                {item.value}
              </Highlight>
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
