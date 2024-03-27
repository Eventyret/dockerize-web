"use client"
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from './ui/use-toast';
import { CopyIcon } from 'lucide-react';
import { useDockerStore } from '@/lib/store/useDockerStore';
import { generateDockerfile } from './generateDockerfile';
import { redirect } from 'next/navigation';


const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast({
      title: "Success",
      description: "Dockerfile copied to clipboard!",
    });
  }).catch((err) => {
    console.error('Failed to copy text to clipboard', err);
  });
};


const DockerfileDisplay = () => {
  const { env, nodeVersion, packageManager, isFormSubmitted } = useDockerStore();
  const dockerfile = generateDockerfile(nodeVersion, env, packageManager);

  if (!env || !nodeVersion || !packageManager || !isFormSubmitted) {
    redirect('/');
  }


  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold mb-4">Dockerfile{ env === 'production' && `.prod` }</h2>
      <SyntaxHighlighter language="dockerfile" style={ monokai } customStyle={ { position: 'relative', borderRadius: '0.5rem' } } showLineNumbers>
        { dockerfile }
      </SyntaxHighlighter>
      <button
        onClick={ (e) => {
          e.stopPropagation(); // Prevent form submit
          copyToClipboard(dockerfile);
        } }
        className='top-0 right-0 absolute p-2 bg-gray-800 text-white rounded-bl-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none'
        title="Copy to Clipboard"
      >
        <CopyIcon />

      </button>
    </div>
  );
};

export default DockerfileDisplay;
