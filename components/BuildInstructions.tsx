import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const BuildInstructions = () => (
  <div className="bg-white shadow rounded-lg p-6 mt-6">
    <h2 className="text-xl font-semibold mb-4">Building Your Docker Image</h2>
    <SyntaxHighlighter language="bash" style={ monokai }>
      { `docker build \\
  --build-arg NODE_ENV=production \\
  # --build-arg STRAPI_URL=https://api.example.com \\ # Uncomment to set the Strapi Server URL
  -t mystrapiapp:latest \\ # Replace with your image name
  -f Dockerfile.prod .`}
    </SyntaxHighlighter>
    <p className="mt-4">Replace <code>mystrapiapp</code> with your preferred Docker image name.</p>
  </div>
);
