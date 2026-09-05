'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, ArrowLeft, Crown, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Slide } from '@/types';

interface HeroSliderProps {
    slides: Slide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeSlides = slides.filter((s) => s.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

    const next = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent((prev) => (prev + 1) % activeSlides.length);
        setTimeout(() => setIsTransitioning(false), 800);
    }, [activeSlides.length, isTransitioning]);

    const prev = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
        setTimeout(() => setIsTransitioning(false), 800);
    }, [activeSlides.length, isTransitioning]);

    useEffect(() => {
        const timer = setInterval(next, 7000);
        return () => clearInterval(timer);
    }, [next]);

    if (activeSlides.length === 0) {
        return (
            <section className="h-[60vh] min-h-[400px] bg-black flex items-center justify-center mt-20">
                <p className="text-white/30">اسلایدی موجود نیست</p>
            </section>
        );
    }

    return (
        <section ref={containerRef} className="relative h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden mt-20">
            {activeSlides.map((slide, index) => {
                const isActive = index === current;

                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                            }`}
                    >
                        <div className="absolute inset-0">
                            <Image
                                src={slide.image || '/images/fallback.jpg'}
                                alt={slide.title}
                                fill
                                priority={index === 0}
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        {/* خطوط تزئینی */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-gold/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-gold/20 to-transparent" />
                            <div className="absolute top-1/3 left-12 w-48 h-48 rounded-full bg-gold/5 blur-3xl" />
                            <div className="absolute bottom-1/3 left-12 w-48 h-48 rounded-full bg-gold/3 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                        </div>

                        {/* محتوای متنی */}
                        <div className="absolute inset-0 flex items-center justify-end px-6 md:px-12 lg:px-20">
                            <div
                                className={`max-w-xl w-full text-right transition-all duration-700 delay-300 ${isActive ? 'translate-y-0' : 'translate-y-8'
                                    }`}
                            >
                                <div className="relative bg-black/10 backdrop-blur-[2px] p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-xl shadow-black/30 overflow-hidden border border-white/5">
                                    {/* المان‌های تزئینی */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold/5 blur-3xl" />
                                    <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gold/3 blur-3xl" />
                                    <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-gold/10 pointer-events-none" />

                                    {/* خط طلایی بالایی */}
                                    <div className="absolute top-0 right-0 left-0 flex justify-end px-4 md:px-5 py-2">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="w-8 md:w-12 h-[2px] bg-gradient-to-l from-gold to-transparent" />
                                            <Crown className="w-3 h-3 md:w-4 md:h-4 text-gold/60" />
                                            <div className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-gold to-transparent" />
                                        </div>
                                    </div>

                                    {/* نشان ویژه */}
                                    <div className="flex items-center gap-2 mb-3 mt-1">
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-sm">
                                            <Gem className="w-3 h-3 text-gold" />
                                            <span className="text-[8px] md:text-[10px] font-bold text-gold tracking-[0.15em] uppercase">
                                                پروژه شاخص
                                            </span>
                                        </div>
                                        <div className="flex-1 h-px bg-gradient-to-l from-gold/30 to-transparent" />
                                    </div>

                                    {slide.kicker && (
                                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                                            <span className="text-gold text-xs md:text-sm font-light tracking-[0.1em] uppercase">{slide.kicker}</span>
                                            <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
                                        </div>
                                    )}

                                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-3 text-white drop-shadow-2xl tracking-tight">
                                        {slide.title.split(' ').map((word, i) => (
                                            <span key={i} className={`${i === 0 ? 'text-gold' : ''} inline-block mr-1.5`}>
                                                {word}
                                            </span>
                                        ))}
                                    </h1>

                                    {slide.desc && (
                                        <div className="relative mb-3">
                                            <div className="absolute right-0 top-0 w-6 h-0.5 bg-gold/40" />
                                            <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-xl pt-3 font-light tracking-wide drop-shadow-lg">
                                                {slide.desc}
                                            </p>
                                        </div>
                                    )}

                                    {slide.manager && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-gold/30 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                                                <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-gold" />
                                            </div>
                                            <p className="text-xs md:text-sm text-white/80 font-light tracking-wider drop-shadow-lg">
                                                {slide.manager}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 md:gap-3 pt-1">
                                        <Button
                                            asChild
                                            className="group relative bg-gradient-to-r from-gold via-gold-light to-gold-dark hover:from-gold-light hover:via-gold hover:to-gold-dark text-black font-bold px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-500 hover:scale-105 hover:-translate-y-0.5 overflow-hidden"
                                        >
                                            <a href={slide.btn1Link || '#projects'}>
                                                <span className="relative z-10 flex items-center gap-2 text-sm md:text-base tracking-wide">
                                                    {slide.btn1Text || 'مشاهده پروژه‌ها'}
                                                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-all duration-500 group-hover:-translate-x-1.5 group-hover:scale-110" />
                                                </span>
                                                <span className="absolute inset-0 bg-gradient-to-r from-gold-light via-gold to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <span className="absolute -inset-full top-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent transform skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                            </a>
                                        </Button>

                                        <Button
                                            asChild
                                            variant="outline"
                                            className="group relative border-2 border-white/20 hover:border-gold bg-white/5 backdrop-blur-sm hover:bg-gold/10 text-white hover:text-gold font-semibold px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-gold/20 overflow-hidden"
                                        >
                                            <a href={slide.btn2Link || '#contact'}>
                                                <span className="relative z-10 text-sm md:text-base tracking-wide">
                                                    {slide.btn2Text || 'درخواست مشاوره'}
                                                </span>
                                                <span className="absolute inset-0 border-2 border-gold/0 hover:border-gold/30 rounded-xl md:rounded-2xl transition-all duration-500" />
                                                <span className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </a>
                                        </Button>
                                    </div>

                                    {/* شمارنده */}
                                    <div className="absolute bottom-3 md:bottom-4 left-4 md:left-5 flex items-center gap-2">
                                        <span className="text-lg md:text-xl font-light text-gold/80 font-mono tracking-widest">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="w-6 md:w-8 h-px bg-gold/30" />
                                        <span className="text-[10px] md:text-xs text-white/20 font-mono tracking-widest">
                                            {String(activeSlides.length).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* دکمه‌های ناوبری */}
            <button
                onClick={prev}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-2xl text-white hover:bg-gold hover:text-black transition-all duration-500 border border-white/10 hover:border-gold shadow-2xl shadow-black/30 hover:shadow-gold/40 group flex items-center justify-center"
                aria-label="اسلاید قبلی"
            >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 transition-all duration-500 group-hover:-translate-x-0.5 group-hover:scale-110" />
            </button>
            <button
                onClick={next}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-2xl text-white hover:bg-gold hover:text-black transition-all duration-500 border border-white/10 hover:border-gold shadow-2xl shadow-black/30 hover:shadow-gold/40 group flex items-center justify-center"
                aria-label="اسلاید بعدی"
            >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transition-all duration-500 group-hover:translate-x-0.5 group-hover:scale-110" />
            </button>

            {/* نقاط راهنما */}
            <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-2xl px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-white/10 shadow-2xl shadow-black/30">
                {activeSlides.map((_, index) => (
                    <button
                        key={index}
                        className={`relative transition-all duration-700 ${index === current
                                ? 'w-6 md:w-8 h-2 bg-gradient-to-r from-gold to-gold-light rounded-full shadow-lg shadow-gold/50'
                                : 'w-2 h-2 bg-white/20 rounded-full hover:bg-white/40'
                            }`}
                        onClick={() => setCurrent(index)}
                        aria-label={`اسلاید ${index + 1}`}
                    >
                        {index === current && (
                            <>
                                <span className="absolute -inset-0.5 rounded-full bg-gold/20 blur-md animate-ping" />
                                <span className="absolute -inset-1 rounded-full bg-gold/10 blur-xl animate-pulse" />
                            </>
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}