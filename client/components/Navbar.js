import React, { useState } from 'react';
import Link from 'next/link';

const NavLinks = [
  { href: '/javascript', name: 'Javascript' },
  { href: '/reactjs', name: 'ReactJs' },
  { href: '/javascript-coding-questions', name: 'Javascript coding questions' },
  { href: '/javascript-output-questions', name: 'Javascript output questions' },
  { href: '/react-scenarios', name: 'React Scenarios' },
  { href: '/html', name: 'HTML' },
  { href: '/css', name: 'CSS' },
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
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-2">
        {/* Left section with logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-gray-700 dark:text-gray-300">
            My Notes
          </Link>
        </div>

        {/* Hamburger menu button, aligned to the right on mobile/tablet */}
        <button onClick={toggleMenu} className="ml-auto p-2 lg:hidden focus:outline-none">
          {!isOpen
            ? (<svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g> <g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g> </svg>)
            : (<svg className="w-6 h-6 text-gray-700 dark:text-gray-300" width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>)}
        </button>

        {/* Nav Links for larger screens */}
        <div className="hidden lg:flex md:hidden space-x-1 lg:space-x-1">
          {NavLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`py-1 px-3 rounded-lg transition duration-300 ${activeLink === item.name
                ? 'text-blue-500 bg-blue-100'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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
        <div className="md:hidden fixed inset-x-0 top-14 bg-gray-100 dark:bg-gray-800 transition-all duration-300 z-10 shadow-lg">
          <ul className="flex flex-col items-start w-full p-4 font-medium space-y-2">
            {NavLinks.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className={`block py-2 px-3 w-full rounded transition duration-300 ${activeLink === item.name
                    ? 'text-blue-500 bg-blue-100'
                    : 'text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-700'
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
