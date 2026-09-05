'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, RefreshCw, Lock, User, ShieldCheck } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function LoginForm() {
    const { login } = useAuth();
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // دریافت کپچا از سرور
    const fetchCaptcha = async () => {
        try {
            const res = await fetch('/api/auth/login', { method: 'GET' });
            if (res.ok) {
                const data = await res.json();
                setCaptcha(data.captcha);
            } else {
                // در صورت خطا، یک کپچای پیش‌فرض تولید می‌کنیم (فقط برای نمایش)
                generateFallbackCaptcha();
            }
        } catch {
            generateFallbackCaptcha();
        }
        setCaptchaInput('');
    };

    const generateFallbackCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(result);
    };

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (captchaInput.toUpperCase() !== captcha) {
            setError('کد امنیتی اشتباه است.');
            fetchCaptcha();
            return;
        }
        setLoading(true);
        setError('');
        // ارسال کپچا به سرور از طریق تابع login
        const success = await login(username, password, captchaInput);
        setLoading(false);
        if (!success) {
            setError('نام کاربری یا رمز عبور اشتباه است.');
            fetchCaptcha();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background p-4 z-50">
            {/* بلوک برند بالای کادر */}
            <div className="flex flex-col items-center w-full max-w-md">

                {/* برند سایت (دقیقا مثل هدر) */}
                <Link href="/" className="flex items-center gap-2 group flex-shrink-0 mb-8">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-gold shadow-gold/30 shadow-lg flex-shrink-0">
                        <Image src="/images/logo.jpg" alt="آرتام سازه" width={56} height={56} className="object-cover" />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-serif text-2xl font-bold text-gold tracking-wider relative whitespace-nowrap">
                            ARTAM SAZEH
                            <span className="absolute -bottom-1 right-0 w-full h-0.5 bg-gradient-to-l from-gold to-transparent" />
                        </span>
                        <p className="text-[11px] text-gold/80 tracking-wide whitespace-nowrap mt-1.5 text-center">
                            گروه توسعه و ساختمان آرتام سازه
                        </p>
                    </div>
                </Link>

                {/* کادر لاگین */}
                <div className="bg-card border border-gold/15 rounded-2xl p-8 w-full shadow-2xl">

                    {/* عنوان ورود */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-3">
                            <ShieldCheck className="w-4 h-4 text-gold" />
                            <span className="text-gold text-xs font-bold tracking-wider uppercase">ورود به پنل مدیریت</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* نام کاربری */}
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">نام کاربری</label>
                            <div className="relative">
                                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white dark:bg-gray-800 border border-border rounded-xl px-10 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* رمز عبور */}
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">رمز عبور</label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white dark:bg-gray-800 border border-border rounded-xl px-10 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* کپچا */}
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">کد امنیتی</label>
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-border rounded-xl px-3 py-1.5">
                                <span className="font-mono text-xl font-black tracking-wider text-gold select-none">{captcha}</span>
                                <button type="button" onClick={fetchCaptcha} className="p-1.5 rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition">
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                                <input
                                    type="text"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                                    className="flex-1 bg-transparent border-none outline-none text-sm py-1.5 text-center tracking-widest"
                                    maxLength={5}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2">{error}</p>}

                        <button type="submit" disabled={loading} className="w-full bg-gradient-to-l from-gold via-gold-light to-gold-dark hover:from-gold-light hover:via-gold hover:to-gold-dark text-black font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'در حال ورود...' : 'ورود به پنل'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}