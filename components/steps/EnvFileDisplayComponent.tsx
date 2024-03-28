import { generateEnvFile } from '@/lib/generateEnvFile';
import { useDockerComposeFormStore } from '@/lib/store/userDockerComposeStore';
import { useEffect, useState } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '../CopyButton';
import { useFormStore } from '@/lib/store/useFormStore';

const EnvFileDisplayComponent = () => {
  const dockerComposeConfig = useDockerComposeFormStore(state => state);
  const { port } = useFormStore();
  const [envFileContent, setEnvFileContent] = useState('');

  useEffect(() => {
    const content = generateEnvFile(dockerComposeConfig, port);
    setEnvFileContent(content);
  }, [dockerComposeConfig, port]);

  return (
    <div className='relative'>
      <SyntaxHighlighter language="bash" style={ monokai }>
        { envFileContent }
      </SyntaxHighlighter>
      <CopyButton textToCopy={ envFileContent } title='.env file copied to clipboard' />
    </div >
  );
};

export default EnvFileDisplayComponent;
