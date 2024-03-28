"use client"
import { MoonIcon, SunIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import { GiSpermWhale } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import { ThemeToggle } from './theme-toggle';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex h-20 w-full shrink-0 items-center border-b-2  border-gray-100 dark:border-gray-800">
      <Link className="flex items-center px-4 md:px-6" href="#">
        <GiSpermWhale className="h-6 w-6 mr-3 text-green-600" />
        <span>Strapi Dockerize Tool</span>
      </Link>
      <div className="ml-auto flex items-center pr-4 md:pr-6">
        <Button variant={ "outline" } className="mr-4">
          <FaGithub className="h-6 w-6" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Navbar;
