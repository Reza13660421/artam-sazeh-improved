import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Mail, Instagram, Linkedin, Youtube, MessageCircle, Send } from 'lucide-react';
import type { Settings } from '@/types';

export default function Footer({ settings }: { settings: Settings }) {
    return (
        <footer className="bg-background border-t-2 border-gold/15 pt-12 pb-0">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* برند و توضیحات - دقیقاً مثل هدر */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0 mb-4">
                            {/* لوگوی کوچک */}
                            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-gold shadow-gold/30 shadow-lg flex-shrink-0">
                                <Image src="/images/logo.jpg" alt="لوگو آرتام سازه" width={48} height={48} className="object-cover" />
                            </div>
                            {/* تصویر برند بزرگ */}
                            <Image src="/images/brand-logo.png" alt="آرتام سازه" width={160} height={60} className="w-auto h-12 md:h-14 object-contain" />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                            گروه توسعه و ساختمان آرتام سازه با بیش از ۱۵ سال تجربه در صنعت ساخت و ساز، ارائه‌دهنده خدمات جامع در
                            حوزه مشارکت در ساخت، ساختمان‌سازی و سرمایه‌گذاری آپارتمانی در تمام مناطق تهران.
                        </p>
                        <a
                            href={`tel:${settings.phone.replace(/\s/g, '')}`}
                            className="inline-flex items-center gap-2 text-gold font-semibold mt-3 hover:text-gold-light transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            {settings.phone}
                        </a>
                    </div>

                    {/* دسترسی سریع */}
                    <div>
                        <h4 className="text-gold font-bold text-sm mb-4 relative pb-2 after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-gold">
                            دسترسی سریع
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-gold transition-colors">صفحه اصلی</Link></li>
                            <li><Link href="/#about" className="hover:text-gold transition-colors">درباره ما</Link></li>
                            <li><Link href="/#services" className="hover:text-gold transition-colors">خدمات</Link></li>
                            <li><Link href="/#projects" className="hover:text-gold transition-colors">پروژه‌ها</Link></li>
                            <li><Link href="/#testimonials" className="hover:text-gold transition-colors">نظرات</Link></li>
                            <li><Link href="/#blog" className="hover:text-gold transition-colors">اخبار</Link></li>
                            <li><Link href="/#contact" className="hover:text-gold transition-colors">تماس</Link></li>
                        </ul>
                    </div>

                    {/* خدمات */}
                    <div>
                        <h4 className="text-gold font-bold text-sm mb-4 relative pb-2 after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-gold">
                            خدمات تخصصی
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/#services" className="hover:text-gold transition-colors">مشارکت در ساخت</Link></li>
                            <li><Link href="/#services" className="hover:text-gold transition-colors">طراحی و اجرا</Link></li>
                            <li><Link href="/#services" className="hover:text-gold transition-colors">سرمایه‌گذاری ساختمانی</Link></li>
                            <li><Link href="/#services" className="hover:text-gold transition-colors">مدیریت پروژه</Link></li>
                            <li><Link href="/#services" className="hover:text-gold transition-colors">مشاوره تخصصی</Link></li>
                        </ul>
                    </div>

                    {/* ارتباط با ما */}
                    <div>
                        <h4 className="text-gold font-bold text-sm mb-4 relative pb-2 after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-gold">
                            ارتباط با ما
                        </h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                                <span>{settings.address}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gold" />
                                <span>{settings.phone}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gold" />
                                <span>{settings.email}</span>
                            </li>
                        </ul>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="w-9 h-9 border border-gold/20 rounded-lg flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 border border-gold/20 rounded-lg flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 border border-gold/20 rounded-lg flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                <MessageCircle className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 border border-gold/20 rounded-lg flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                <Send className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 border border-gold/20 rounded-lg flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/30 text-center text-xs text-muted-foreground py-5 mt-8">
                    <p>{settings.footer}</p>
                    <p className="mt-1 text-[10px]">
                        طراحی و توسعه توسط تیم حرفه‌ای | <a href="#" className="text-gold hover:underline">www.artamsazeh.com</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}