import { useState } from 'react';
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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-white/10">

      {/* ── Desktop: fully centered nav links, no logo ── */}
      <div className="hidden md:flex items-center justify-center h-16">
        <ul className="flex items-center space-x-2">
          {items.map((item) => (
            <li key={item.name} className="list-none">
              {item.isExternal ? (
                <a href={item.url} onClick={closeMenu} className="relative inline-block group">
                  <span className="relative z-10 flex items-center gap-2 uppercase text-white/80 font-semibold transition-colors duration-300 group-hover:text-black text-sm py-2 px-4 lg:text-base">
                    <item.icon className="w-4 h-4 hidden lg:block" />
                    {item.name}
                  </span>
                  <span className="absolute inset-0 border-t-2 border-b-2 border-white transform scale-y-[2] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100" />
                  <span className="absolute top-[2px] left-0 w-full h-full bg-white transform scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100" />
                </a>
              ) : (
                <Link to={item.url} onClick={closeMenu} className="relative inline-block group">
                  <span className="relative z-10 flex items-center gap-2 uppercase text-white/80 font-semibold transition-colors duration-300 group-hover:text-black text-sm py-2 px-4 lg:text-base">
                    <item.icon className="w-4 h-4 hidden lg:block" />
                    {item.name}
                  </span>
                  <span className="absolute inset-0 border-t-2 border-b-2 border-white transform scale-y-[2] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100" />
                  <span className="absolute top-[2px] left-0 w-full h-full bg-white transform scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Mobile: logo on left + hamburger on right ── */}
      <div className="flex md:hidden items-center justify-between px-6 h-16">
        <Link to="/" onClick={closeMenu} className="text-white font-bold text-xl tracking-tight">
          Priyanshu<span className="text-blue-400">.</span>
        </Link>
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col bg-black/95 backdrop-blur-md border-t border-white/10 px-6 py-3 space-y-1">
          {items.map((item) => (
            <li key={item.name} className="list-none">
              {item.isExternal ? (
                <a
                  href={item.url}
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-white/70 hover:text-white font-semibold uppercase tracking-widest text-sm py-3 px-2 border-b border-white/5 transition-colors duration-200"
                >
                  <item.icon className="w-4 h-4 text-blue-400 shrink-0" />
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.url}
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-white/70 hover:text-white font-semibold uppercase tracking-widest text-sm py-3 px-2 border-b border-white/5 transition-colors duration-200"
                >
                  <item.icon className="w-4 h-4 text-blue-400 shrink-0" />
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
