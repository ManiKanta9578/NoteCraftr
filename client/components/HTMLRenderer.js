import React from 'react';

export const HTMLRenderer = ({ 
  htmlContent, 
  className = '', 
  allowedTags = ['p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'u', 'br', 'hr', 'blockquote', 'code', 'pre']
}) => {
  const sanitizeHTML = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const scripts = tempDiv.getElementsByTagName('script');
    while (scripts.length > 0) {
      scripts[0].remove();
    }
    return tempDiv.innerHTML;
  };

  return (
    <div 
      className={`html-content-renderer prose prose-gray max-w-none text-sm
        [&_ul]:list-disc [&_ul]:pl-8 [&_ol]:list-decimal [&_ol]:pl-5
        [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl
        [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic
        [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded [&_code]:text-red-600
        ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizeHTML(htmlContent) }}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};