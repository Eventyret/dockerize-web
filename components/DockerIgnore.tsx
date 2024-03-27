import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    <SyntaxHighlighter language="bash" style={ dark }>
      { dockerignoreContent }
    </SyntaxHighlighter>
  );
};
