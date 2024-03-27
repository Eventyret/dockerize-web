"use client"
import { useFormStore } from '@/lib/store/useFormStore';
import { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CirclesWithBar } from 'react-loader-spinner';
import LoadingSpinner from './LoadingSpinner';

export const BuildInstructions = () => {
  const { env, projectName } = useFormStore()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSpinner />
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4"></h2>
      <SyntaxHighlighter language="bash" style={ monokai }>
        { `docker build --build-arg NODE_ENV=production -t ${projectName || 'mystrapiapp'}:latest -f Dockerfile${env === 'production' ? '.prod' : ''} .` }
      </SyntaxHighlighter>
    </div>
  )

}
