import React, { useState } from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const NavLinks = [
  { href: '/javascript', name: 'Javascript' },
  { href: '/reactjs', name: 'ReactJs' },
  { href: '/javascript-coding-questions', name: 'Javascript coding questions' },
  { href: '/javascript-output-questions', name: 'Javascript output questions' },
  { href: '/react-scenarios', name: 'React Scenarios' },
  { href: '/html', name: 'HTML' },
  { href: '/css', name: 'CSS' },
  { href: '/addNote', name: 'Create' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsOpen(false);
  };

  return (
    <nav className=" fixed w-full z-10 top-0 left-0  shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-2">
        {/* Left section with logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-gray-700 dark:text-gray-300">
            📓MyNotes
          </Link>
        </div>

        <div className="flex items-center"> <ThemeSwitcher /> </div>

        {/* Hamburger menu button, aligned to the right on mobile/tablet */}
        <button onClick={toggleMenu} className="ml-auto p-2 lg:hidden focus:outline-none">
          {!isOpen ? (
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 18L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M4 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="white"></rect>
              <path d="M7 17L16.8995 7.10051" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M7 7.00001L16.8995 16.8995" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          )}
        </button>

        {/* Nav Links for larger screens */}
        <div className="hidden lg:flex md:hidden space-x-1 lg:space-x-1">
          {NavLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`py-1 px-3 rounded-lg transition duration-300 ${activeLink === item.name
                ? 'text-blue-500 bg-blue-100'
                : 'hover:bg-gray-800'
                }`}
              onClick={() => handleLinkClick(item.name)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu - slide-in effect */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 transition-all duration-300 z-10 shadow-lg">
          <ul className="flex flex-col items-start w-full p-4 font-medium space-y-2">
            {NavLinks.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className={`block py-2 px-3 w-full rounded transition duration-300 ${activeLink === item.name
                      ? 'text-blue-500 bg-blue-100 dark:text-blue-300 dark:bg-blue-900' // Active link styles for mobile
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' // Regular link styles for mobile
                    }`}
                  aria-current={activeLink === item.name ? 'page' : undefined}
                  onClick={() => handleLinkClick(item.name)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
