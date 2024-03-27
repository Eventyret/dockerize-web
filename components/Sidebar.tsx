"use client"
import React from 'react';
import { BuildingIcon, FileIcon, FilePlusIcon, FireExtinguisherIcon, FolderIcon, InfoIcon, SettingsIcon, TerminalIcon } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { id: 1, title: 'Project Information', Icon: InfoIcon },
  { id: 2, title: 'Create Dockerfile', Icon: FilePlusIcon },
  { id: 3, title: 'Add Dockerfile Content', Icon: FileIcon },
  { id: 4, title: 'Create .dockerignore', Icon: FireExtinguisherIcon },
  { id: 5, title: 'Build Docker Image', Icon: BuildingIcon },
];

export const Sidebar = () => (
  <div className="hidden min-h-0 md:flex flex-col w-64 border-r border-gray-100  dark:border-gray-800">
    <nav className="flex-1">
      <div className="grid gap-1.5 justify-center h-full">
        <Link
          className="flex h-10 items-center justify-center px-4 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="#"
        >
          <SettingsIcon className="h-6 w-6" />
          Config
        </Link>
        <Link
          className="flex h-10 items-center justify-center px-4 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="#"
        >
          <TerminalIcon className="h-6 w-6" />
          Setup
        </Link>
        <Link
          className="flex h-10 items-center justify-center px-4 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="#"
        >
          <FolderIcon className="h-6 w-6" />
          Files
        </Link>
      </div>
    </nav>
  </div>

);

