"use client"
import React from 'react'
import { toast } from './ui/use-toast'
import { CopyIcon } from 'lucide-react'

type Props = {
  textToCopy: string
  title: string
}

const copyToClipboard = (text: string, title: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast({
      title: "Success",
      description: title
    });
  }).catch((err) => {
    console.error('Failed to copy text to clipboard', err);
  });
}


export const CopyButton = ({ textToCopy, title }: Props) => {
  return (
    <button
      onClick={ (e) => {
        e.stopPropagation();
        copyToClipboard(textToCopy, title);
      } }
      className='top-0 right-0 absolute p-2 bg-gray-800 text-white rounded-bl-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none'
      title="Copy to Clipboard"
    >
      <CopyIcon />

    </button>
  )
}
