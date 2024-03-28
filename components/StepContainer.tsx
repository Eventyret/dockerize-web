"use client"
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import LoadingOverlay from './LoadingOverlay';
import Step from './Step';
import { BuildInstructions } from './steps/BuildInstructions';
import DockerComposeFileDisplay from './steps/DockerComposeDisplay';
import { DockerComposeForm } from './steps/DockerComposeForm';
import { DockerForm } from './steps/DockerForm';
import { DockerignoreDisplay } from './steps/DockerIgnore';
import DockerfileDisplay from './steps/DockerfileDisplay';
import EnvFileDisplayComponent from './steps/EnvFileDisplayComponent';
import { RunInstructions } from './steps/RunInstructions';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';


const StepsContainer = () => {
  const [showComposeConfig, setShowComposeConfig] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(true);
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
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setDialogVisible(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setDialogVisible(false);
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
          <Button onClick={ handlePrevious } disabled={ currentStep === 0 }>
            Previous
          </Button>
          {/* Conditional rendering of DialogTrigger based on whether it's the last step */ }
          { currentStep === steps.length - 1 ? (
            <Dialog open={ dialogVisible }  >
              <DialogTrigger asChild>
                <Button onClick={ () => setDialogVisible(true) }>Finish</Button>
              </DialogTrigger>
              <DialogContent className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg'>
                <DialogHeader>
                  <DialogTitle className='font-semibold text-center'>You&apos;ve just Strapi-fied your project! 🎉</DialogTitle>

                  <DialogDescription className="text-center p-4 flex flex-col -base md:text-lg mx-auto">
                    <img src="https://c.tenor.com/nid30V-4hk0AAAAC/tenor.gif" alt="Confetti" className="w-full h-auto" />
                    <span className='my-2'>🐳 Looks like Docker isn&apos;t just for shipping containers anymore. Welcome to the club of elite chefs serving gourmet code dishes in containerized fashion.</span>
                    <br />
                    <span>🔧 With a few clicks and a dash of copy-pasta, you&apos;ve bolted a Strapi engine onto your Docker ship. Sailing towards API paradise, aren&apos;t we? </span>
                    <br />
                    <span>👨‍💻 Sharing is caring, but let&apos;s be honest, showing off is even better. Got your GitHub portfolio ready to dazzle the coding paparazzi? 🌟</span>
                    <br />
                    <span>Remember, it&apos;s not just about making it work; it&apos;s about making it work with flair, a sprinkle of sarcasm, and maybe a Docker whale or two for good company. 😉</span>
                    <br />
                    <span className="font-medium">Liked zipping through the high seas of code with our Strapi-Docker compass? Throw us a ⭐ on GitHub. It fuels our ship and keeps the sarcasm brewing! 😄</span>
                    <br />
                    <a href="https://github.com/eventyret/dockerize-web" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white font-bold py-2 px-4 rounded mt-4">
                      ⭐️ Star us on GitHub & Make Our Day!
                    </a>
                  </DialogDescription>
                </DialogHeader>
                <Button onClick={ handleReset }>Restart</Button>
              </DialogContent>
            </Dialog>

          ) : (
            <Button onClick={ handleNext }>
              Next
            </Button>
          )
          }
        </div >

      </div >
    </section >
  );
};

export default StepsContainer;
``
