"use client"
import { useFormStore } from '@/lib/store/useFormStore';
import { BuildInstructions } from './BuildInstructions';
import { DockerForm } from './DockerForm';
import { DockerignoreDisplay } from './DockerIgnore';
import DockerfileDisplay from './DockerfileDisplay';
import { motion } from 'framer-motion';
import Step from './Step';
import { useState } from 'react';
import { Button } from './ui/button';



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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('You have completed all the steps!');
    }
  };

  // Bottom to top animation for steps, skipping the first step
  const stepAnimation = {
    hidden: { scaleY: 0 },
    show: {
      scaleY: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-4">
      <div className="container px-4 mx-auto">
        { steps.slice(0, currentStep + 1).map((step, index) => (
          <motion.div
            key={ index }
            variants={ stepAnimation }
            initial={ index > 0 ? "hidden" : "show" } // Skip animation for the first step
            animate="show"
            exit="hidden"
            style={ {
              originY: 1, // Animate from bottom to top
              overflow: 'hidden',
              ...(index > 0 ? {} : { scaleY: 1 }) // Ensure the first step does not start scaled
            } }
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