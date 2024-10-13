import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const NoteCard = ({ note }) => {
  return (
    <div className="card">
      <h3>{note.question}</h3>
      <p>{note.answer}</p>
      <SyntaxHighlighter language="javascript">
        {note.code}
      </SyntaxHighlighter>
    </div>
  );
};

export default NoteCard;
