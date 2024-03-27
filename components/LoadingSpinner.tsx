"use client"
import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner';

type Props = {}

export default function LoadingSpinner({ }: Props) {
  return (
    <CirclesWithBar
      height="100"
      width="100"
      color="#e11d48"
      outerCircleColor="#e11d48"
      innerCircleColor="#e11d48"
      barColor="#e11d48"
      ariaLabel="circles-with-bar-loading"
      wrapperStyle={ {} }
      wrapperClass=""
      visible={ true }
    />
  )
}