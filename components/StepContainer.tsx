"use client"
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BuildInstructions } from './BuildInstructions';
import { DockerForm } from './DockerForm';
import { DockerignoreDisplay } from './DockerIgnore';
import DockerfileDisplay from './DockerfileDisplay';
import Step from './Step';
import { Button } from './ui/button';
import LoadingSpinner from './LoadingSpinner';



const steps = [
  {
    title: "Configuration",
    description: "Let's configure your Dockerfile",
    content: <DockerForm />,
  },
  {
    title: "Dockerfile",
    description: "Here is your modified Dockerfile",
    content: <DockerfileDisplay />
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
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  if (!isMounted) {
    return <LoadingSpinner />;
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
              >
                { step.content }
              </Step>
            </motion.div>
          )) }
        </AnimatePresence>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={ handleNext }
          >
            { currentStep === steps.length - 1 ? "Finish" : "Next" }
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StepsContainer;