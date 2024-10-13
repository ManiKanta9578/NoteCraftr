import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styles from '../styles/NoteCard.module.css';

const NoteCard = ({ note }) => {
  return (
    <div className={styles.card}>
      <h3>{note.question}</h3>
      
      {/* Render content in order */}
      {note.content.length > 0 ? (
        note.content.map((item, index) => {
          if (item.type === "answer") {
            return <p key={index}>{item.value}</p>;
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
        <p>No content available.</p>
      )}
    </div>
  );
};

export default NoteCard;
