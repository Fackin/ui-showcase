import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../contexts/ThemeContext';

interface CodeViewerProps {
  code: string;
  language?: string;
}

export const CodeViewer = ({ code, language = 'html' }: CodeViewerProps) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const customStyle = {
    margin: 0,
    padding: '1rem',
    // backgroundColor: 'transparent',
    borderRadius: '0.5rem',
  };

  return (
    <div className="relative group bg-background rounded-lg">
      <SyntaxHighlighter
        language={language}
        style={theme === 'light' ? oneLight : oneDark}
        customStyle={customStyle}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
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