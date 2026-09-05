'use client';

import { useEffect, useRef } from 'react';
import { Calendar, Building2, Users, Award } from 'lucide-react';

const stats = [
    { icon: Calendar, target: 15, label: 'سال تجربه در ساخت و ساز' },
    { icon: Building2, target: 48, label: 'پروژه ساختمانی موفق' },
    { icon: Users, target: 185, label: 'مشتری راضی در تهران' },
    { icon: Award, target: 12, label: 'جوایز و افتخارات صنعت ساختمان' },
];

export default function Stats() {
    const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        countersRef.current.forEach((counter, index) => {
                            if (!counter) return;
                            const target = stats[index].target;
                            let current = 0;
                            const increment = Math.ceil(target / 60);
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    counter.textContent = target.toString();
                                    clearInterval(timer);
                                } else {
                                    counter.textContent = current.toString();
                                }
                            }, 25);
                        });
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        const section = document.getElementById('stats');
        if (section) observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="stats" className="py-8 md:py-10 border-y border-gold/15 bg-background/60">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-4">
                            <stat.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                            <div
                                ref={(el) => {
                                    countersRef.current[index] = el;
                                }}
                                className="text-3xl md:text-4xl font-black text-gold"
                            >
                                0
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
