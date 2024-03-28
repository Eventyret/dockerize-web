"use client"
import { useFormStore } from '@/lib/store/useFormStore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '../CopyButton';
import { generateDockerfile } from '../../lib/generateDockerfile';


const DockerfileDisplay = () => {
  const config = useFormStore(state => state);
  const dockerfile = generateDockerfile(config);

  return (
    <div className="relative">
      { }<SyntaxHighlighter language="dockerfile" style={ monokai } customStyle={ { position: 'relative', borderRadius: '0.5rem' } } showLineNumbers>
        { dockerfile }
      </SyntaxHighlighter>
      <CopyButton textToCopy={ dockerfile } title="Dockerfile copied to clipboard!" />
    </div>
  )
};

export default DockerfileDisplay;
