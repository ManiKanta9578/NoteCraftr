import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button onClick={toggleTheme} className="p-2">
            {theme === 'light' ? '🌙' : '🔆'}
        </button>
    );
};

export default ThemeSwitcher;
