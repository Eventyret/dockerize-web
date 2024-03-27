"use client"
import { ContainerIcon, GithubIcon, MoonIcon, SunIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex h-20 w-full shrink-0 items-center border-b-2  border-gray-100 dark:border-gray-800">
      <Link className="flex items-center px-4 md:px-6 text-blue-400" href="#">
        <ContainerIcon className="h-6 w-6 mr-3" />
        <span>Strapi Dockerize Tool</span>
      </Link>
      <div className="ml-auto flex items-center pr-4 md:pr-6">
        <Button className="mr-4">
          <GithubIcon className="h-6 w-6" />
        </Button>
        <Button>
          <SunIcon className="h-6 w-6" />
          <MoonIcon className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
