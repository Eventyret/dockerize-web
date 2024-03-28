import { useFormStore } from '@/lib/store/useFormStore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '../CopyButton';

interface BuildInstructionsProps {
  composeCommand: boolean;
}

export const BuildInstructions = ({ composeCommand }: BuildInstructionsProps) => {
  const { env, projectName } = useFormStore();

  const buildArg = env === 'production' ? '--build-arg NODE_ENV=production' : '';
  const buildCommandParts = [
    'docker build',
    ...(buildArg ? [buildArg] : []),
    '--env-file .env',
    `-t ${projectName || 'mystrapiapp'}:latest`,
    `-f Dockerfile${env === 'production' ? '.prod' : ''}`,
    '.'
  ];

  const buildCommand = buildCommandParts.join(' ');
  const buildComposeCommand = `docker-compose -f docker-compose.yml up --build`;

  return (
    <div className='relative'>
      <SyntaxHighlighter language="bash" style={ monokai }>
        { composeCommand ? buildComposeCommand : buildCommand }
      </SyntaxHighlighter>
      <CopyButton textToCopy={ composeCommand ? buildComposeCommand : buildCommand } title="Build command copied to clipboard!" />
    </div>
  );
}
