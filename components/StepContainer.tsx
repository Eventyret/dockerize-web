import { BuildInstructions } from './BuildInstructions';
import { DockerForm } from './DockerForm';
import { DockerignoreDisplay } from './DockerIgnore';
import DockerfileDisplay from './DockerfileDisplay';
import Step from './Step';



const steps = [
  {
    title: "Configuration",
    description: "Let's configure your Dockerfile",
    content: <DockerForm />,
  },
  {
    title: "Dockerfile",
    description: "Here is your modified Dockerfile",
    content: <div>
      <DockerfileDisplay />
      <div className="mt-4">Build Docker Image</div>
    </div>,

  },
  {
    title: ".dockerignore",
    description: "Specify files and directories to exclude from the Docker build context",
    content: <DockerignoreDisplay />,
  },
  {
    title: "Building Your Docker Image",
    description: "Build your Docker image using the following instructions",
    content: <BuildInstructions />,
  }
]

const StepsContainer = () => {
  return (
    <section className="py-4">
      <div className="container px-4 mx-auto">
        <div className="px-6 pt-5 pb-7 bg-white border rounded-xl">
          { steps.map((step, index) => (
            <Step key={ index } number={ (index + 1).toString() } title={ step.title } description={ step.description }>
              { step.content }
            </Step>
          )) }

        </div>
      </div>
    </section>
  );
};

export default StepsContainer;
