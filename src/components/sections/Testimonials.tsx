'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Send, Loader2 } from 'lucide-react';
import type { Testimonial } from '@/types';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
    const approved = testimonials.filter(t => t.status === 'approved');
    const displayTestimonials = approved.slice(0, 3);

    const [current, setCurrent] = useState(0);
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (displayTestimonials.length === 0) return;
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % displayTestimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [displayTestimonials.length]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !text || !rating) {
            setMessage('❌ لطفاً نام، امتیاز و متن نظر را وارد کنید.');
            setTimeout(() => setMessage(''), 4000);
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            const res = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, title: title || 'کاربر سایت', rating, text }),
            });

            if (!res.ok) throw new Error('Failed to submit');

            setMessage('✅ دیدگاه شما با موفقیت ثبت شد و پس از تأیید مدیر نمایش داده خواهد شد.');
            setName('');
            setTitle('');
            setRating(5);
            setText('');
            setTimeout(() => setMessage(''), 5000);
        } catch {
            setMessage('❌ خطا در ثبت دیدگاه، لطفاً مجدداً تلاش کنید.');
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="testimonials" className="py-16 md:py-20 bg-background/60">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-gold text-sm font-semibold tracking-wider border-r-2 border-gold pr-3">نظرات مشتریان</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3">آنچه مشتریان ما می‌گویند</h2>
                    <div className="w-16 h-1 bg-gradient-to-l from-gold to-transparent mx-auto rounded-full" />
                </div>

                {displayTestimonials.length > 0 && (
                    <div className="relative max-w-3xl mx-auto mb-12">
                        <div className="overflow-hidden rounded-2xl border border-gold/20 bg-card shadow-xl">
                            <div className="relative p-8 md:p-12">
                                <Quote className="absolute top-4 left-4 w-12 h-12 text-gold/10" />
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: displayTestimonials[current].rating }).map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                                        ))}
                                    </div>
                                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                                        {displayTestimonials[current].text}
                                    </p>
                                    <div className="font-bold text-foreground">{displayTestimonials[current].name}</div>
                                    <div className="text-sm text-gold">{displayTestimonials[current].title}</div>
                                </div>
                            </div>
                        </div>

                        {displayTestimonials.length > 1 && (
                            <>
                                <button onClick={() => setCurrent((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)} className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:ml-0 md:-ml-6 w-10 h-10 rounded-full bg-card border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition" aria-label="نظر قبلی">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={() => setCurrent((prev) => (prev + 1) % displayTestimonials.length)} className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:mr-0 md:-mr-6 w-10 h-10 rounded-full bg-card border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition" aria-label="نظر بعدی">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {displayTestimonials.length > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {displayTestimonials.map((_, idx) => (
                                    <button key={idx} onClick={() => setCurrent(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === current ? 'bg-gold w-6' : 'bg-muted-foreground/30'}`} aria-label={`نظر ${idx + 1}`} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="max-w-2xl mx-auto">
                    <div className="bg-card border border-gold/20 rounded-2xl p-6 md:p-8 shadow-xl">
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Quote className="w-5 h-5 text-gold" />
                            دیدگاه خود را بنویسید
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="input-label">نام شما *</label>
                                    <input type="text" className="input-field" placeholder="مثلاً: رضا احمدی" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div>
                                    <label className="input-label">عنوان شغلی (اختیاری)</label>
                                    <input type="text" className="input-field" placeholder="مثلاً: سرمایه‌گذار" value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <label className="input-label">امتیاز شما *</label>
                                <div className="flex items-center gap-1 p-2 rounded-xl bg-background/60 border border-border/50 w-fit">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="transition-transform hover:scale-125">
                                            <Star className={`w-7 h-7 ${(hoverRating || rating) >= star ? 'fill-gold text-gold' : 'text-muted-foreground/30'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="input-label">متن نظر شما *</label>
                                <textarea rows={4} className="textarea-field" placeholder="تجربه خود را از همکاری با آرتام سازه بنویسید..." value={text} onChange={e => setText(e.target.value)} />
                            </div>

                            {message && <div className="text-sm font-medium text-center p-3 rounded-xl bg-background/50 border border-border/50">{message}</div>}

                            <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-l from-gold via-gold-light to-gold-dark hover:from-gold-light hover:via-gold hover:to-gold-dark text-black font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                {isSubmitting ? 'در حال ارسال...' : 'ارسال دیدگاه'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}