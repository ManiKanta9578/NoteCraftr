import React, { useState } from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const NavLinks = [
  { href: '/javascript', name: 'Javascript' },
  { href: '/reactjs', name: 'ReactJs' },
  { href: '/dsa', name: 'DSA' },
  { href: '/jSOutput', name: 'JSOutput' },
  { href: '/reactMR', name: 'ReactMR' },
  { href: '/html', name: 'HTML' },
  { href: '/css', name: 'CSS' },
  { href: '/addNote', name: 'Create' },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsDrawerOpen(false);
  };

  return (
    <nav className="fixed w-full z-10 top-0 left-0 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-2">
        {/* Left section with logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold"> 📓MyNotes </Link>
        </div>

        <div className="flex items-center space-x-4">

          {/* Links for large screens */}
          <div className="hidden md:flex items-center">
            {NavLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 px-3  rounded-lg transition duration-300 ${activeLink === item.name
                  ? ' text-blue-400'
                  : ' hover:text-blue-400'
                  }`}
                onClick={() => handleLinkClick(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <ThemeSwitcher />

          <button onClick={toggleDrawer} className="md:hidden ml-auto p-2 focus:outline-none" >
            {!isDrawerOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path d="M4 18L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" ></path>
                <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" ></path>
                <path d="M4 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" ></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <rect width="24" height="24" fill="white"></rect>
                <path d="M7 17L16.8995 7.10051" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" ></path>
                <path d="M7 7.00001L16.8995 16.8995" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Side Drawer (slides from the right) for small screens */}
        <div className={`fixed w-64 inset-y-0 right-0 transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 bg-white dark:bg-gray-900 shadow-lg md:hidden`}        >
          {/* Close button inside drawer */}
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full focus:outline-none"
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <ul className="flex flex-col items-start p-4 space-y-2">
            {NavLinks.map((item) => (
              <li key={item.name} className="w-full">
                <Link
                  href={item.href}
                  className={`block py-2 px-3 w-full rounded-lg transition duration-300 ${activeLink === item.name
                    ? 'text-blue-500 bg-blue-100 dark:text-blue-300 dark:bg-blue-900'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  onClick={() => handleLinkClick(item.name)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay for mobile/tablet when drawer is open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleDrawer}
        />
      )}
    </nav>
  );
};

export default Navbar;
