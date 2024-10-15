import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const NoteCard = ({ note }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-lg p-6 rounded-lg">
      <h3 className="text-3xl md:text-lg font-bold mb-4 text-gray-800">{note.question}</h3>

      {/* Loop through note content and render based on type */}
      {note.content.length > 0 ? (
        note.content.map((item, index) => {
          if (item.type === 'answer') {
            return (
              <div
                key={index}
                className="mb-4 text-3xl md:text-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.value }} // Render HTML content
              />
            );
          } else if (item.type === 'code') {
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
