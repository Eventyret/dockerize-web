"use client"
import { useFormStore } from '@/lib/store/useFormStore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '../CopyButton';
import { generateDockerfile } from '../../lib/generateDockerfile';
import { generateDockerComposeFile } from '@/lib/generateDockerComposeFile';
import { useDockerComposeFormStore } from '@/lib/store/userDockerComposeStore';


const DockerComposeFileDisplay = () => {
  const config = useDockerComposeFormStore(state => state);
  const composefile = generateDockerComposeFile(config);

  return (
    <div className="relative">
      { }<SyntaxHighlighter language="yaml" style={ monokai } customStyle={ { position: 'relative', borderRadius: '0.5rem' } } showLineNumbers>
        { composefile }
      </SyntaxHighlighter>
      <CopyButton textToCopy={ composefile } title="docker-compose copied to clipboard!" />
    </div>
  )
};

export default DockerComposeFileDisplay;
