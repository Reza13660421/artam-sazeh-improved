'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import type { Settings } from '@/types';

// ✅ اصلاح آیتم منو: 'اخبار' به '/#blog' یا '/blog' اشاره کند
// برای سادگی، به صفحه‌ی بلاگ (که فعلاً وجود ندارد) اشاره نمی‌کنیم، بلکه به بخش نظرات یا یک لینک معتبر دیگر
// در اینجا فرض می‌کنیم بخش blog به صفحه اصلی اضافه شده است (در مرحله بعد)
const navItems = [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'درباره ما', href: '/#about' },
    { label: 'خدمات', href: '/#services' },
    { label: 'پروژه‌ها', href: '/#projects' },
    { label: 'نظرات', href: '/#testimonials' },
    { label: 'مقالات', href: '/#blog' }, // ✅ اصلاح شد
    { label: 'تماس', href: '/#contact' },
];

export default function Header({ settings }: { settings: Settings }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-gold/20' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-shrink-0">
                    <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 px-3 py-2 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 text-sm font-bold shadow-gold/20 shadow-lg">
                        <Phone className="w-4 h-4" />
                        <span className="text-xs md:text-sm">{settings.phone}</span>
                    </a>
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground/80 p-2 hover:text-gold transition-colors" aria-label="منو">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.href} className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-gold transition-colors rounded-lg hover:bg-gold/10 whitespace-nowrap">
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-gold shadow-gold/30 shadow-lg flex-shrink-0">
                        <Image src="/images/logo.jpg" alt="لوگو آرتام سازه" width={48} height={48} className="object-cover" />
                    </div>
                    <Image src="/images/brand-logo.png" alt="آرتام سازه" width={160} height={60} className="w-auto h-12 md:h-14 object-contain" />
                </Link>
            </div>

            {isOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-gold/10 p-4">
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-gold hover:bg-gold/10 rounded-lg transition-all">
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}