"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";
import { ThemeToggle } from './theme-toggle';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/repos/eventyret/dockerize-web')
      .then(response => response.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setStarsCount(data.stargazers_count);
        }
      })
      .catch(error => console.error('Error fetching GitHub stars:', error));
  }, []);

  return (
    <header className="flex h-20 w-full shrink-0 items-center border-b-2 border-gray-100 dark:border-gray-800">
      <Link href="#" className="flex items-center px-4 md:px-6">
        <span>Strapi Dockerize Tool</span>
      </Link>
      <div className="ml-auto flex items-center pr-4 md:pr-6">
        {/* Mouse events to set hover state */ }
        <a href="https://github.com/eventyret/dockerize-web"
          className="flex items-center mr-4"
          onMouseEnter={ () => setIsHovering(true) }
          onMouseLeave={ () => setIsHovering(false) }>
          <FaGithub className="h-5 w-5 mr-1" />
          <span>{ isHovering ? 'Star Project' : `${starsCount} Stars` }</span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Navbar;
