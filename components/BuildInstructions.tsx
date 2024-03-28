"use client"
import { useFormStore } from '@/lib/store/useFormStore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from './CopyButton';

export const BuildInstructions = () => {
  const { env, projectName } = useFormStore()

  const buildCommand = `docker build --build-arg NODE_ENV=production -t ${projectName || 'mystrapiapp'}:latest -f Dockerfile${env === 'production' ? '.prod' : ''} .`;

  return (
    <div className='relative'>
      <SyntaxHighlighter language="bash" style={ monokai }>
        { buildCommand }
      </SyntaxHighlighter>
      <CopyButton textToCopy={ buildCommand } title="Build command copied to clipboard!" />
    </div>
  )

}
