import React, { useState } from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/src/components/ThemeSwitcher';

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
    <nav className="fixed w-full top-0 left-0 shadow-lg p-1 lg:p-0 px-4 bg-inherit z-20">
      <div className="mx-auto flex justify-between items-center">
        {/* Left section with logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl md:text-xl font-bold">📓MyNotes</Link>
        </div>

        {/* Theme switcher */}
        <div className='flex items-center justify-center'>
          <ThemeSwitcher />

          {/* Hamburger menu button */}
          <button onClick={toggleMenu} className="ml-auto focus:outline-none">
            {!isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M4 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
              </svg>
            ) : (
              <svg className="w-8 h-8" width="256px" height="256px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L16.8995 7.10051" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M7 7.00001L16.8995 16.8995" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar with transition */}
      {isOpen &&
        <div className={`fixed inset-y-0 right-0 z-10 bg-white shadow-lg h-full transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}      >
          <ul className="flex flex-col items-start text-lg w-full p-4 font-medium space-y-2 ">
            {NavLinks.map((item, i) => (
              <li key={i} className="w-full">
                <Link
                  href={item.href}
                  className={`block py-2 px-4 w-full rounded transition duration-300 ${activeLink === item.name
                    ? 'text-blue-500 bg-blue-100'
                    : 'text-gray-500'
                    }`}
                  onClick={() => handleLinkClick(item.name)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>}
    </nav>
  );
};

export default Navbar;