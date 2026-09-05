import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/admin/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

const vazir = Vazirmatn({
    subsets: ['arabic'],
    display: 'swap',
    variable: '--font-vazir',
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    title: {
        default: 'آرتام سازه | گروه توسعه و ساختمان',
        template: '%s | آرتام سازه',
    },
    description:
        'گروه توسعه و ساختمان آرتام سازه با بیش از ۱۵ سال تجربه در زمینه مشارکت در ساخت، ساختمان‌سازی و سرمایه‌گذاری آپارتمانی در تهران.',
    keywords: ['آرتام سازه', 'مشارکت در ساخت', 'ساختمان‌سازی', 'سرمایه‌گذاری ساختمانی', 'تهران'],
    authors: [{ name: 'آرتام سازه' }],
    creator: 'آرتام سازه',
    publisher: 'آرتام سازه',
    openGraph: {
        type: 'website',
        locale: 'fa_IR',
        url: 'https://artamsazeh.com',
        siteName: 'آرتام سازه',
        title: 'آرتام سازه | گروه توسعه و ساختمان',
        description: 'پیشرو در مشارکت در ساخت و ساختمان‌سازی در تهران',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'آرتام سازه | گروه توسعه و ساختمان',
        description: 'پیشرو در مشارکت در ساخت و ساختمان‌سازی در تهران',
        images: ['/images/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
    alternates: {
        canonical: '/',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl" className={`${vazir.variable}`} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var stored = localStorage.getItem('theme');
                                    if (stored === 'light') {
                                        document.documentElement.classList.remove('dark');
                                    } else {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className="bg-background text-foreground font-vazir antialiased">
                <AuthProvider>
                    {children}
                    <ThemeToggle />
                </AuthProvider>
            </body>
        </html>
    );
}