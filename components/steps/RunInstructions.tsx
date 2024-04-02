import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '../CopyButton';
import { useFormStore } from '@/lib/store/useFormStore';

export const RunInstructions = () => {
  const { projectName, port } = useFormStore();
  const projectNameOrDefault = projectName || 'mystrapiapp';
  const runCommand = `docker run -p ${port}:${port} --env-file=.env ${projectNameOrDefault}:latest`;

  return (
    <div className='relative'>
      <SyntaxHighlighter language="bash" style={ monokai }>
        { runCommand }
      </SyntaxHighlighter>
      <CopyButton textToCopy={ runCommand } title="Run command copied to clipboard!" />
    </div>
  );
}
