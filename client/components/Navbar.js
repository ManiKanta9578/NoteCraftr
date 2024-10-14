import React, { useState } from 'react';

const NavLinks = [
    { href: '#', name: 'Javascript' },
    { href: '/reactjs', name: 'ReactJs' },
    { href: '#', name: 'Javascript coding questions' },
    { href: '#', name: 'Javascript output questions' },
    { href: '#', name: 'React Scenarios' },
    { href: '#', name: 'HTML' },
    { href: '#', name: 'CSS' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(NavLinks[0]?.name);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        setIsOpen(false);
    };

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="md:flex md:w-auto md:order-1 w-full flex justify-between">
                <div className="flex items-end">
                    <button onClick={toggleMenu} className="p-2 focus:outline-none">
                        <svg
                            className="w-6 h-6 text-gray-700 dark:text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className='dark:bg-gray-800 border border-gray-100 fixed top-10 left-0 h-[100%] bg-gray-900 bg-opacity-90 transition-all duration-300 ease-in-out z-10'>
                    <ul className="flex flex-col items-start w-full p-4 font-medium rounded-lg space-x-8 rtl:space-x-reverse mt-0 border-0">
                        {NavLinks.map((item, i) => (
                            <li key={i}>
                                <div className="block py-2 px-3 w-full rounded hover:bg-blue-700 bg-transparent p-0 dark:text-blue-500">
                                    <a
                                        href={item.href}
                                        className={`w-full ${
                                            activeLink === item.name ? 'text-blue-500' : 'text-white'
                                        }`}
                                        aria-current={activeLink === item.name ? "page" : undefined}
                                        onClick={() => handleLinkClick(item.name)}
                                    >
                                        {item.name}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
