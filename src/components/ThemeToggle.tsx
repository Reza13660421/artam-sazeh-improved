'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        if (newIsDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-card border border-gold/30 shadow-lg hover:shadow-gold/20 transition-all hover:scale-110"
            aria-label="تغییر تم"
        >
            {isDark ? <Sun className="w-6 h-6 text-gold" /> : <Moon className="w-6 h-6 text-gold" />}
        </button>
    );
}