import React from 'react';
import { Progress } from './ui/progress';

const LoadingOverlay = () => {

  const progress = 50;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='text-center'>
        <Progress value={ progress } className={ `w-full mb-4 max-w-md` } />
        <h2 className="text-lg font-bold text-white mb-2">{ randomLoadingText } { randomEmoji }</h2>
      </div>
    </div>
  );
};

export default LoadingOverlay;
