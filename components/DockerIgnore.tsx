"use client"
import { CopyIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { copyToClipboard } from './DockerfileDisplay';
import { CirclesWithBar } from 'react-loader-spinner';
import LoadingSpinner from './LoadingSpinner';

export const DockerignoreDisplay = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const dockerignoreContent = `
.tmp/
.cache/
.git/
.env
build/
node_modules/
# Ignoring folders that might be used in starter templates
data/
backup/
  `.trim();

  if (!isMounted) {
    return <LoadingSpinner />
  }

  return (
    <div className='relative'>
      <SyntaxHighlighter language="bash" style={ monokai }>
        { dockerignoreContent }
      </SyntaxHighlighter>
      <button
        onClick={ (e) => {
          e.stopPropagation();
          copyToClipboard(dockerignoreContent, "Dockerignore copied to clipboard!");
        } }
        className='top-0 right-0 absolute p-2 bg-gray-800 text-white rounded-bl-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none'
        title="Copy to Clipboard"
      >
        <CopyIcon />

      </button>
    </div>
  );
};
