/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: '#d4af37',
                    dark: '#b8962a',
                    light: '#e6c97a',
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: 'hsl(var(--card))',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
            },
            fontFamily: {
                vazir: ['Vazirmatn', 'system-ui', 'Tahoma', 'Arial', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'pulse-gold': 'pulseGold 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseGold: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};