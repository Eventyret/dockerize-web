"use client"
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateDockerfile, generateDynamicHelpTexts } from '@/components/generateDockerfile';
import DockerfileDisplay from '@/components/DockerfileDisplay';
import { useDockerStore } from '@/lib/store/useDockerStore';
import Sidebar from './Sidebar';
import { BuildInstructions } from './BuildInstructions';
import { DockerignoreDisplay } from './DockerIgnore';
import { StepByStepGuide } from './StepByStepGuide';
import { redirect } from 'next/navigation';

export default function DisplayDockerFile() {
  const dockerfileRef = useRef(null);
  const dockerignoreRef = useRef(null);
  const buildInstructionsRef = useRef(null);
  const router = useRouter();
  const { env, nodeVersion, packageManager, isFormSubmitted } = useDockerStore();
  const [dockerfile, setDockerfile] = useState('');
  const [helpText, setHelpTexts] = useState([]);



  useEffect(() => {
    if (!isFormSubmitted || !env || !nodeVersion || !packageManager) {
      redirect('/')
    }

    const generatedDockerfile = generateDockerfile(nodeVersion, env, packageManager);
    setDockerfile(generatedDockerfile);
    const dynamicHelpTexts = generateDynamicHelpTexts(generatedDockerfile);
    // setHelpTexts(dynamicHelpTexts);
  }, [env, nodeVersion, packageManager, isFormSubmitted]);

  const scrollToRef = (ref: React.RefObject<HTMLElement>) => window.scrollTo({ top: ref?.current?.offsetTop, behavior: 'smooth' });

  const handleStepClick = (stepId: number) => {
    switch (stepId) {
      case 1: scrollToRef(dockerfileRef); break;
      case 2: scrollToRef(dockerfileRef); break;
      case 3: scrollToRef(dockerignoreRef); break;
      case 4: scrollToRef(buildInstructionsRef); break;
      default: break;
    }
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar onStepClick={ handleStepClick } />
      <div className="flex-1">
        <section ref={ dockerfileRef } className="min-h-screen flex justify-center items-center">
          <div className="max-w-4xl mx-auto">
            <StepByStepGuide step={ 1 } />
            <DockerfileDisplay />
          </div>
        </section>
        <section ref={ dockerignoreRef } className="min-h-screen flex justify-center items-center">
          <DockerignoreDisplay />
        </section>
        <section ref={ buildInstructionsRef } className="min-h-screen flex justify-center items-center">
          <BuildInstructions />
        </section>
      </div>
    </div>
  );
}
