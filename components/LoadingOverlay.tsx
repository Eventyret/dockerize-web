"use client"
import React, { useState, useEffect } from 'react';
import { Progress } from './ui/progress';
import { LOADING_TEXT, EMOJI } from '@/lib/loading-text';


const LoadingOverlay = () => {
  const [progress, setProgress] = useState(0);
  const [randomLoadingText, setRandomLoadingText] = useState('');
  const [randomEmoji, setRandomEmoji] = useState('');

  useEffect(() => {
    setRandomLoadingText(LOADING_TEXT[Math.floor(Math.random() * LOADING_TEXT.length)]);
    setRandomEmoji(EMOJI[Math.floor(Math.random() * EMOJI.length)]);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress >= 100 ? 0 : prevProgress + 10;
        return nextProgress;
      });
    }, 1000); // Progress increment every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='text-center text-white relative'>
        <Progress value={ progress } className={ `w-full mb-4 max-w-md` } />
        <h2 className="text-lg font-bold text-white mb-2">{ randomLoadingText } { randomEmoji }</h2>
      </div>
    </div>
  );
};

export default LoadingOverlay;
