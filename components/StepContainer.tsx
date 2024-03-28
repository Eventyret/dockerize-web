"use client"
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Step from './Step';
import { DockerForm } from './steps/DockerForm';
import { DockerComposeForm } from './steps/DockerComposeForm';
import DockerfileDisplay from './steps/DockerfileDisplay';
import { DockerignoreDisplay } from './steps/DockerIgnore';
import DockerComposeFileDisplay from './steps/DockerComposeDisplay';
import LoadingOverlay from './LoadingOverlay';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { BuildInstructions } from './steps/BuildInstructions';
import EnvFileDisplayComponent from './steps/EnvFileDisplayComponent';
import { RunInstructions } from './steps/RunInstructions';

const StepsContainer = () => {
  const [showComposeConfig, setShowComposeConfig] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize steps
  let steps = [
    {
      title: "Configuration",
      description: "Let's configure your Dockerfile",
      extraOptions: currentStep === 0 ? (
        <div className="flex items-center space-x-2">
          <Switch id="docker-compose-view" onCheckedChange={ (checked) => setShowComposeConfig(checked) } />
          <Label htmlFor="docker-compose-view">Enable Docker Compose</Label>
        </div>
      ) : undefined,
      content: (
        <div className='flex flex-col items-center space-y-4'>
          <DockerForm />
          { showComposeConfig && <DockerComposeForm show={ showComposeConfig } /> }
        </div>
      ),
    },
    {
      title: "Dockerfile",
      description: "Here is your modified Dockerfile",
      content: <DockerfileDisplay />,
    },
    {
      title: ".dockerignore",
      description: "Specify files and directories to exclude from the Docker build context",
      content: <DockerignoreDisplay />,
    },
  ];

  if (showComposeConfig) {
    steps.push({
      title: "Docker Compose",
      description: "Here is your Docker Compose configuration",
      content: <DockerComposeFileDisplay />,
    });
    steps.push({
      title: "Replacing your .env file",
      description: "File is located at the root of your project",
      content: <EnvFileDisplayComponent />,

    })
  }

  steps.push({
    title: "Building Your Docker Image",
    description: showComposeConfig
      ? "Use the following command to start Docker Compose"
      : "Build your Docker image using the following instructions",
    content: <BuildInstructions composeCommand={ showComposeConfig } />,
  });

  steps.push({
    title: "Running Your Docker Container",
    description: "Use the following command to run your Docker container",
    content: <RunInstructions />,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (animationCompleted) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setAnimationCompleted(false); // Reset the flag
    }
  }, [animationCompleted]);

  const handleNext = () => {
    setAnimationCompleted(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('You have completed all the steps!');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isMounted) {
    return <LoadingOverlay />;
  }

  return (
    <section className="py-4" ref={ containerRef }>
      <div className="container px-4 mx-auto">
        <AnimatePresence>
          { steps.slice(0, currentStep + 1).map((step, index) => (
            <motion.div
              key={ index }
              initial={ { opacity: 0 } }
              animate={ { opacity: 1 } }
              exit={ { opacity: 0 } }
              transition={ { duration: 0.5 } }
              onAnimationComplete={ () => setAnimationCompleted(true) }
            >
              <Step
                number={ (index + 1).toString() }
                title={ step.title }
                description={ step.description }
                extraOptions={ step.extraOptions }
              >
                { step.content }
              </Step>
            </motion.div>
          )) }
        </AnimatePresence>
        <div className="mt-4 flex justify-between">
          { <Button onClick={ handlePrevious } disabled={ currentStep === 0 }>
            Previous
          </Button> }
          <Button onClick={ handleNext }>
            { currentStep === steps.length - 1 ? "Finish" : "Next" }
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StepsContainer;
``
