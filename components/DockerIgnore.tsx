import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from './CopyButton';

export const DockerignoreDisplay = () => {

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

  return (
    <div className='relative'>
      <SyntaxHighlighter language="bash" style={ monokai }>
        { dockerignoreContent }
      </SyntaxHighlighter>
      <CopyButton textToCopy={ dockerignoreContent } title="Dockerignore copied to clipboard!" />

    </div>
  );
};
