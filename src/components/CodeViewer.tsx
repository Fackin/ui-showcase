import { useState } from 'react';

interface CodeViewerProps {
  code: string;
  language?: string;
}

export const CodeViewer = ({ code, language = 'html' }: CodeViewerProps) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <div className="relative group">
      <pre className="code-block">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 bg-background-tertiary text-text-primary text-sm rounded 
                   opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background-hover"
      >
        {copied ? '✓ 已复制' : '📋 复制'}
      </button>
    </div>
  );
};