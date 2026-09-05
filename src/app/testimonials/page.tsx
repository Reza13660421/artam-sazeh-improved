import { loadData } from '@/lib/data-service';
import Link from 'next/link';
import { Star, Quote, ArrowLeft, Home } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
    title: 'همه نظرات مشتریان | آرتام سازه',
    description: 'مشاهده تمام نظرات و تجربیات مشتریان از همکاری با گروه توسعه و ساختمان آرتام سازه',
    alternates: {
        canonical: '/testimonials',
    },
};

export default async function AllTestimonialsPage() {
    const data = await loadData();
    const approvedTestimonials = data.testimonials.filter(t => t.status === 'approved');

    return (
        <div className="min-h-screen bg-background">
            {/* هدر */}
            <header className="relative bg-gradient-to-r from-black via-black/95 to-black/90 border-b border-gold/10 py-12 md:py-16 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gold/3 blur-3xl" />
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    {/* دکمه بازگشت */}
                    <div className="mb-6">
                        <Link href="/#testimonials" className="group inline-flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/5 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative flex items-center gap-3 px-5 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-xl hover:border-gold/50 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 shadow-lg shadow-gold/10 group-hover:shadow-gold/30">
                                    <div className="flex items-center gap-2">
                                        <Home className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
                                        <ArrowLeft className="w-4 h-4 text-gold/70 group-hover:-translate-x-1 transition-transform duration-300" />
                                    </div>
                                    <div className="w-px h-5 bg-gold/20" />
                                    <span className="text-sm font-medium text-white/80 group-hover:text-gold transition-colors duration-300">
                                        بازگشت به صفحه اصلی
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4">
                            <Quote className="w-3.5 h-3.5 text-gold" />
                            <span className="text-gold text-xs font-bold tracking-[0.15em] uppercase">نظرات مشتریان</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            همه نظرات <span className="text-gold">مشتریان آرتام سازه</span>
                        </h1>
                        <div className="w-20 h-1 bg-gradient-to-l from-gold to-transparent mx-auto rounded-full mt-4" />
                        <p className="text-white/60 text-sm md:text-base mt-4 max-w-2xl mx-auto">
                            تجربیات واقعی مشتریان از همکاری با گروه توسعه و ساختمان آرتام سازه
                        </p>
                    </div>
                </div>
            </header>

            {/* لیست نظرات */}
            <main className="container mx-auto px-4 md:px-8 py-12">
                {approvedTestimonials.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">هنوز نظری ثبت نشده است.</p>
                        <Link href="/#contact">
                            <button className="mt-4 bg-gold hover:bg-gold-dark text-black font-bold px-6 py-3 rounded-xl transition-all hover:scale-105">
                                ثبت اولین نظر
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {approvedTestimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="group bg-card border border-border rounded-2xl p-6 transition-all hover:-translate-y-2 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 relative overflow-hidden"
                            >
                                <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/10 transition" />
                                <Quote className="absolute top-4 left-4 w-10 h-10 text-gold/10" />

                                <div className="relative">
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed text-sm mb-6 line-clamp-4">
                                        {testimonial.text}
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                                        <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-foreground text-sm">{testimonial.name}</div>
                                            <div className="text-xs text-gold">{testimonial.title}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* فوتر ساده */}
            <section className="border-t border-gold/10 py-8 bg-gradient-to-r from-black/50 via-black/30 to-transparent">
                <div className="container mx-auto px-4 text-center">
                    <Link href="/" className="group inline-flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/5 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-center gap-3 px-6 py-3.5 bg-black/40 backdrop-blur-md border border-gold/20 rounded-xl hover:border-gold/50 transition-all duration-300">
                                <Home className="w-4 h-4 text-gold" />
                                <ArrowLeft className="w-4 h-4 text-gold/70" />
                                <div className="w-px h-5 bg-gold/20" />
                                <span className="text-sm font-medium text-white/80 group-hover:text-gold">بازگشت به صفحه اصلی</span>
                            </div>
                        </div>
                    </Link>
                    <p className="text-white/30 text-xs mt-4">آرتام سازه – همراه مطمئن شما در ساخت و سرمایه‌گذاری</p>
                </div>
            </section>
        </div>
    );
}