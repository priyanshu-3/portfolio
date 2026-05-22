import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  isExternal?: boolean;
}

interface NavMenuProps {
  items: NavItem[];
}

export function NavMenu({ items }: NavMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black">
      {/* Mobile menu toggle button - only visible on small screens */}
      <button 
        onClick={toggleMenu}
        className="md:hidden absolute top-4 right-6 z-20 p-2"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
      </button>
      
      {/* Menu container - adapts to screen size */}
      <div className={`
        flex items-center justify-center w-full
        md:block md:h-auto md:py-4
        ${isMenuOpen ? 'block h-screen bg-black/90 backdrop-blur-md pt-24' : 'hidden md:block'}
      `}>
        <ul className={`
          flex flex-col items-center space-y-6
          md:flex-row md:space-y-0 md:space-x-4 md:justify-center
          lg:space-x-8
        `}>
          {items.map((item) => (
            <li key={item.name} className="list-none">
              {item.isExternal ? (
                <a 
                  href={item.url} 
                  className="relative inline-block group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="
                    relative z-10 flex items-center gap-2 uppercase text-white/80 
                    font-sans font-semibold transition-colors duration-300 
                    group-hover:text-black
                    text-xl py-2 px-3
                    md:text-sm md:py-2 md:px-3
                    lg:text-base lg:py-2 lg:px-4
                  ">
                    <item.icon className="w-4 h-4 hidden lg:block" />
                    {item.name}
                  </span>
                  {/* Top & bottom border animation */}
                  <span className="
                    absolute inset-0 border-t-2 border-b-2 border-white
                    transform scale-y-[2] opacity-0 
                    transition-all duration-300 origin-center
                    group-hover:scale-y-100 group-hover:opacity-100
                  " />
                  {/* Background fill animation */}
                  <span className="
                    absolute top-[2px] left-0 w-full h-full bg-white
                    transform scale-0 opacity-0
                    transition-all duration-300 origin-top
                    group-hover:scale-100 group-hover:opacity-100
                  " />
                </a>
              ) : (
                <Link 
                  to={item.url} 
                  className="relative inline-block group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="
                    relative z-10 flex items-center gap-2 uppercase text-white/80 
                    font-sans font-semibold transition-colors duration-300 
                    group-hover:text-black
                    text-xl py-2 px-3
                    md:text-sm md:py-2 md:px-3
                    lg:text-base lg:py-2 lg:px-4
                  ">
                    <item.icon className="w-4 h-4 hidden lg:block" />
                    {item.name}
                  </span>
                  {/* Top & bottom border animation */}
                  <span className="
                    absolute inset-0 border-t-2 border-b-2 border-white
                    transform scale-y-[2] opacity-0 
                    transition-all duration-300 origin-center
                    group-hover:scale-y-100 group-hover:opacity-100
                  " />
                  {/* Background fill animation */}
                  <span className="
                    absolute top-[2px] left-0 w-full h-full bg-white
                    transform scale-0 opacity-0
                    transition-all duration-300 origin-top
                    group-hover:scale-100 group-hover:opacity-100
                  " />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
