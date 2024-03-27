"use client"
import { useFormStore } from '@/lib/store/useFormStore';
import { CopyIcon } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { generateDockerfile } from './generateDockerfile';
import { toast } from './ui/use-toast';


export const copyToClipboard = (text: string, title: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast({
      title: "Success",
      description: title
    });
  }).catch((err) => {
    console.error('Failed to copy text to clipboard', err);
  });
};


const DockerfileDisplay = () => {
  const config = useFormStore(state => state);

  const dockerfile = generateDockerfile(config);


  return (
    <div className="relative">
      <SyntaxHighlighter language="dockerfile" style={ monokai } customStyle={ { position: 'relative', borderRadius: '0.5rem' } } showLineNumbers>
        { dockerfile }
      </SyntaxHighlighter>
      <button
        onClick={ (e) => {
          e.stopPropagation(); // Prevent form submit
          copyToClipboard(dockerfile, "Dockerfile copied to clipboard!");
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
