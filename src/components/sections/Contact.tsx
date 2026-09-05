'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, Award, Sparkles, Gem, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Settings } from '@/types';

export default function Contact({ settings }: { settings: Settings }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.message) {
            setStatus('❌ لطفاً نام، شماره تماس و پیام را وارد کنید.');
            return;
        }
        setIsSubmitting(true);
        setStatus('');

        try {
            const res = await fetch('/api/consultations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to submit');
            setStatus('✅ درخواست شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.');
            setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus(''), 5000);
        } catch {
            setStatus('❌ خطا در ثبت درخواست، لطفاً مجدداً تلاش کنید.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactItems = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: 'دفتر مرکزی',
            description: settings.address,
            sub: 'مدیریت پروژه‌های ساختمانی در سراسر پایتخت',
            color: 'from-amber-500/20 to-amber-500/5',
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: 'تماس مستقیم',
            description: (
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-gold font-semibold text-sm hover:underline">
                    {settings.phone}
                </a>
            ),
            sub: 'مشاوره رایگان مشارکت در ساخت',
            color: 'from-emerald-500/20 to-emerald-500/5',
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: 'ایمیل',
            description: (
                <a href={`mailto:${settings.email}`} className="text-gold text-sm hover:underline">
                    {settings.email}
                </a>
            ),
            sub: 'پاسخگویی ۲۴ ساعته',
            color: 'from-blue-500/20 to-blue-500/5',
        },
    ];

    const workingHours = [
        { day: 'شنبه تا چهارشنبه', hours: '۹:۰۰ - ۱۸:۰۰' },
        { day: 'پنجشنبه', hours: '۹:۰۰ - ۱۴:۰۰' },
        { day: 'جمعه', hours: 'تعطیل' },
    ];

    const trustItems = [
        { icon: <Crown className="w-6 h-6" />, label: 'بیش از ۱۵ سال تجربه', color: 'from-amber-500/20' },
        { icon: <Gem className="w-6 h-6" />, label: '۴۸ پروژه موفق', color: 'from-emerald-500/20' },
        { icon: <Award className="w-6 h-6" />, label: '۱۸۵ مشتری راضی', color: 'from-blue-500/20' },
        { icon: <Sparkles className="w-6 h-6" />, label: '۱۲ جایزه صنعت ساختمان', color: 'from-purple-500/20' },
    ];

    return (
        <section id="contact" className="relative py-16 md:py-24 overflow-hidden bg-background/60">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gold/3 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/3 blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                {/* هدر بخش */}
                <div className="relative max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-5">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span className="text-gold text-xs font-bold tracking-[0.15em] uppercase">ارتباط با ما</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.3]">
                        <span className="text-foreground">شروع یک پروژه مشارکتی</span>{' '}
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-gold via-gold-light to-gold">
                            با ما در ارتباط باشید
                            <span className="absolute -bottom-1.5 right-0 w-full h-0.5 bg-gradient-to-l from-gold to-transparent rounded-full" />
                        </span>
                    </h2>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-gold to-transparent mx-auto rounded-full mt-4" />
                    <p className="text-muted-foreground text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                        ما آماده پاسخگویی به سوالات شما در زمینه{' '}
                        <strong className="text-gold font-semibold">مشارکت در ساخت</strong> و{' '}
                        <strong className="text-gold font-semibold">سرمایه‌گذاری ساختمانی</strong> هستیم
                    </p>
                </div>

                {/* شبکه اصلی */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
                    {/* ستون اطلاعات تماس */}
                    <div className="lg:col-span-2 space-y-5">
                        {contactItems.map((item, index) => (
                            <div
                                key={index}
                                className="group relative bg-card/60 backdrop-blur-sm border border-gold/10 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 overflow-hidden"
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />
                                <div className="relative flex items-start gap-4">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 text-right">
                                        <h4 className="font-bold text-base text-foreground">{item.title}</h4>
                                        <div className="text-sm text-muted-foreground mt-0.5">{item.description}</div>
                                        <p className="text-xs text-muted-foreground/70 mt-1">{item.sub}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* کارت ساعت کاری */}
                        <div className="bg-card/60 backdrop-blur-sm border border-gold/10 rounded-2xl p-6 transition-all duration-500 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-base text-foreground">ساعات پاسخگویی</h4>
                            </div>
                            <div className="space-y-2">
                                {workingHours.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm border-b border-border/30 pb-2 last:border-0 last:pb-0">
                                        <span className="text-muted-foreground">{item.day}</span>
                                        <span className="font-medium text-foreground">{item.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* نقشه (اضافه شده) */}
                        <div className="bg-card/60 backdrop-blur-sm border border-gold/10 rounded-2xl p-4 transition-all duration-500 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-base text-foreground">موقعیت روی نقشه</h4>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-border/50">
                                <iframe
                                    title="موقعیت آرتام سازه"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.700978676761!2d51.389181!3d35.689197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e001e2f1e6d7f%3A0x2f2c4f4d3a2d5e4b!2sTehran%2C%20Iran!5e0!3m2!1sen!2s!4v1670000000000!5m2!1sen!2s"
                                    width="100%"
                                    height="220"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ستون فرم تماس */}
                    <div className="lg:col-span-3">
                        <div className="relative bg-card/60 backdrop-blur-sm border border-gold/15 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/20 hover:shadow-gold/5 transition-all duration-500 overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gold/5 blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gold/3 blur-3xl" />

                            <div className="relative">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1 h-6 bg-gold rounded-full" />
                                    <h3 className="text-xl font-bold text-foreground">ثبت درخواست مشاوره</h3>
                                    <span className="text-xs text-muted-foreground mr-auto">* الزامی</span>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                                نام و نام خانوادگی <span className="text-gold">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all duration-300 hover:border-gold/30"
                                                placeholder="نام خود را وارد کنید"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                                شماره تماس <span className="text-gold">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all duration-300 hover:border-gold/30"
                                                placeholder="۰۹۱۲xxx"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">ایمیل</label>
                                            <input
                                                type="email"
                                                className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all duration-300 hover:border-gold/30"
                                                placeholder="example@mail.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">موضوع درخواست</label>
                                            <select
                                                className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all duration-300 hover:border-gold/30"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            >
                                                <option value="">انتخاب کنید...</option>
                                                <option value="consultation">مشاوره مشارکت در ساخت</option>
                                                <option value="partnership">پیشنهاد مشارکت در ساخت</option>
                                                <option value="investment">مشاوره سرمایه‌گذاری ساختمانی</option>
                                                <option value="management">مدیریت پروژه ساختمانی</option>
                                                <option value="other">سایر موارد</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                                            توضیحات پروژه یا درخواست شما <span className="text-gold">*</span>
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all duration-300 hover:border-gold/30 resize-y"
                                            placeholder="مشخصات زمین، منطقه، متراژ، بودجه مورد نظر و توضیحات پروژه را بنویسید..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>

                                    {status && (
                                        <div className={`text-center text-sm font-medium ${status.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
                                            {status}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative w-full bg-gradient-to-r from-gold via-gold-light to-gold-dark hover:from-gold-light hover:via-gold hover:to-gold-dark text-black font-bold py-3.5 rounded-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <Send className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                                            {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست مشاوره'}
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-gold-light via-gold to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <span className="absolute -inset-full top-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent transform skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                    </Button>
                                </form>

                                <p className="text-[10px] text-muted-foreground/70 text-center mt-4">
                                    اطلاعات شما نزد ما محفوظ است و فقط برای پاسخگویی استفاده می‌شود.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* نشان‌های اعتماد */}
                <div className="mt-16 pt-10 border-t-2 border-gold/20">
                    <div className="text-center mb-6">
                        <span className="text-gold/60 text-xs font-bold tracking-[0.2em] uppercase">چرا آرتام سازه</span>
                        <div className="w-12 h-0.5 bg-gradient-to-l from-gold to-transparent mx-auto rounded-full mt-1.5" />
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute -inset-4 bg-gold/5 blur-2xl rounded-3xl" />
                        <div className="relative bg-card/40 backdrop-blur-sm border border-gold/15 rounded-3xl p-6 md:p-8 shadow-2xl shadow-gold/5 hover:shadow-gold/10 transition-all duration-700">
                            <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-gold/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-gold/30 to-transparent" />

                            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                {trustItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl bg-background/30 hover:bg-background/50 border border-transparent hover:border-gold/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5"
                                    >
                                        <div
                                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} to-transparent border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-black transition-all duration-500`}
                                        >
                                            {item.icon}
                                        </div>
                                        <span className="text-sm md:text-base font-bold text-foreground mt-3 text-center leading-tight">
                                            {item.label}
                                        </span>
                                        <span className="w-8 h-0.5 bg-gradient-to-l from-gold/30 to-transparent rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}