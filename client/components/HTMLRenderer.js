// Advanced HTML Renderer Component
export const HTMLRenderer = ({ 
  htmlContent, 
  className = '', 
  allowedTags = ['p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'u', 'br', 'hr', 'blockquote', 'code', 'pre']
}) => {
  // Basic sanitization to prevent XSS and control HTML content
  const sanitizeHTML = (html) => {
    // Create a temporary div to parse and sanitize HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove script and potentially dangerous tags
    const scripts = tempDiv.getElementsByTagName('script');
    while (scripts.length > 0) {
      scripts[0].remove();
    }

    return tempDiv.innerHTML;
  };

  return (
    <div 
      // Comprehensive styling for rendered HTML
      className={`
        html-content-renderer 
        prose         // Prose class for typography
        prose-gray    // Neutral gray color scheme
        max-w-none    // Remove max-width constraints
        
        // List styling
        [&_ul]:list-disc 
        [&_ul]:pl-5 
        [&_ul]:marker:text-blue-600
        [&_ol]:list-decimal 
        [&_ol]:pl-5 

        // Headings
        [&_h1]:text-3xl 
        [&_h1]:font-bold 
        [&_h1]:text-gray-900
        [&_h2]:text-2xl 
        [&_h2]:font-semibold 
        [&_h2]:text-gray-800
        [&_h3]:text-xl 
        [&_h3]:font-medium 
        [&_h3]:text-gray-700

        // Text formatting
        [&_strong]:font-bold 
        [&_strong]:text-gray-900
        [&_em]:italic 
        [&_em]:text-gray-700

        // Blockquote styling
        [&_blockquote]:border-l-4 
        [&_blockquote]:border-blue-500 
        [&_blockquote]:pl-4 
        [&_blockquote]:italic 
        [&_blockquote]:text-gray-600

        // Code styling
        [&_code]:bg-gray-100 
        [&_code]:px-1 
        [&_code]:py-0.5 
        [&_code]:rounded 
        [&_code]:text-sm 
        [&_code]:text-red-600

        // Horizontal rule
        [&_hr]:border-t 
        [&_hr]:border-gray-300 
        [&_hr]:my-4

        ${className}
      `}
      
      // Render sanitized HTML content
      dangerouslySetInnerHTML={{ 
        __html: sanitizeHTML(htmlContent) 
      }}
      
      // Prevent context menu to add basic security
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};