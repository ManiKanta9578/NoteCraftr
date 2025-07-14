import React, { useState } from 'react';
import { Menu, X, BookOpen, Code, Globe, Layers, Terminal, Database, FileText, Zap, Layout, Palette, Plus } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { useRouter } from 'next/router';

const NavLinks = [
  { href: '/notes/JavaScript', name: 'Javascript', icon: Code },
  { href: '/notes/NextJs', name: 'NextJs', icon: Globe },
  { href: '/notes/React', name: 'ReactJs', icon: Layers },
  { href: '/notes/Nodejs', name: 'Nodejs', icon: Terminal },
  { href: '/notes/DSA', name: 'DSA', icon: Database },
  { href: '/notes/JSOutput', name: 'JSOutput', icon: FileText },
  { href: '/notes/ReactMR', name: 'ReactMR', icon: Zap },
  { href: '/notes/HTML', name: 'HTML', icon: Layout },
  { href: '/notes/CSS', name: 'CSS', icon: Palette },
  { href: '/addNote', name: 'Create', icon: Plus },
];

const Navbar = () => {

  const router = useRouter();
  let currentPath = router.pathname

  // const [currentPath, setCurrentPath] = useState('/');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLinkClick = (href) => {
    // setCurrentPath(href);
    setIsDrawerOpen(false);
    router.push(href);
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <button 
                onClick={() => handleLinkClick('/')}
                className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                NoteCraftr
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {NavLinks.map((item) => {
                const isActive = currentPath === item.href;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleLinkClick(item.href)}
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <ThemeSwitcher />

              {/* Mobile Menu Button */}
              <button
                onClick={toggleDrawer}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                aria-label="Open menu"
              >
                {isDrawerOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`lg:hidden fixed inset-y-0 right-0 w-72 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">NoteCraftr</span>
            </div>
            <button
              onClick={toggleDrawer}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-1 bg-white dark:bg-slate-900 flex flex-col h-[91vh]">
            <div className='flex-1 overflow-y-auto p-4'>
              {NavLinks.map((item) => {
                const isActive = currentPath === item.href;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleLinkClick(item.href)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800' 
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      isActive 
                        ? 'bg-blue-100 dark:bg-blue-900/50' 
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-1"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className=" border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Theme</span>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isDrawerOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={toggleDrawer}
          />
        )}
      </nav>
  );
};

export default Navbar;