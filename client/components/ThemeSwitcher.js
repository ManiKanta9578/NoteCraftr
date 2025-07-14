import { useState, useEffect } from "react";
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('light');

    // Initialize theme from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document?.documentElement.setAttribute('data-theme', savedTheme);
        document?.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document?.documentElement.setAttribute('data-theme', newTheme);
        document?.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme); // Save to localStorage
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
    );
};

export default ThemeSwitcher;