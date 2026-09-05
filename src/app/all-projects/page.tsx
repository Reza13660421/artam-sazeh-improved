import { loadData } from '@/lib/data-service';
import Link from 'next/link';
import Projects from '@/components/sections/Projects';
import { ArrowLeft, Home, Sparkles, Crown, ChevronRight, ChevronLeft } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
    title: 'همه پروژه‌ها | آرتام سازه',
    description: 'مشاهده همه پروژه‌های موفق گروه توسعه و ساختمان آرتام سازه در مناطق مختلف تهران',
    alternates: {
        canonical: '/all-projects',
    },
};

export default async function AllProjectsPage({ searchParams }: { searchParams: { page?: string } }) {
    const data = await loadData();
    const currentPage = parseInt(searchParams.page || '1');
    const perPage = 6;
    const totalProjects = data.projects.length;
    const totalPages = Math.ceil(totalProjects / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const pagedProjects = data.projects.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-background">
            {/* هدر با طراحی لوکس */}
            <header className="relative bg-gradient-to-r from-black via-black/95 to-black/90 border-b border-gold/10 py-12 md:py-16 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gold/3 blur-3xl" />
                <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-gold/30 to-transparent" />
                <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-gold/20 to-transparent" />

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    {/* دکمه بازگشت */}
                    <div className="mb-6">
                        <Link href="/" className="group inline-flex items-center gap-3">
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

                    {/* عنوان صفحه */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-gold" />
                            <span className="text-gold text-xs font-bold tracking-[0.15em] uppercase">پروژه‌های شاخص</span>
                            <Crown className="w-3.5 h-3.5 text-gold/60" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            همه پروژه‌های <span className="text-gold">آرتام سازه</span>
                        </h1>
                        <div className="w-20 h-1 bg-gradient-to-l from-gold to-transparent mx-auto rounded-full mt-4" />
                        <p className="text-white/60 text-sm md:text-base mt-4 max-w-2xl mx-auto">
                            مجموعه‌ای از پروژه‌های موفق در حوزه <strong className="text-gold">مشارکت در ساخت</strong> و{' '}
                            <strong className="text-gold">ساختمان‌سازی</strong> در مناطق مختلف تهران
                        </p>
                    </div>
                </div>
            </header>

            {/* بخش پروژه‌ها */}
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
                <Projects projects={pagedProjects} showAll />
            </div>

            {/* صفحه‌بندی */}
            {totalPages > 1 && (
                <div className="container mx-auto px-4 md:px-8 pb-12 flex items-center justify-center gap-2">
                    {currentPage > 1 && (
                        <Link
                            href={`/all-projects?page=${currentPage - 1}`}
                            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-card border border-border text-muted-foreground hover:border-gold/30 hover:text-gold transition"
                        >
                            <ChevronRight className="w-4 h-4" />
                            قبلی
                        </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Link
                            key={page}
                            href={`/all-projects?page=${page}`}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition ${page === currentPage
                                    ? 'bg-gold text-black border-gold font-bold'
                                    : 'bg-card border-border text-muted-foreground hover:border-gold/30 hover:text-gold'
                                }`}
                        >
                            {page}
                        </Link>
                    ))}
                    {currentPage < totalPages && (
                        <Link
                            href={`/all-projects?page=${currentPage + 1}`}
                            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-card border border-border text-muted-foreground hover:border-gold/30 hover:text-gold transition"
                        >
                            بعدی
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            )}

            {/* بخش پایین با دکمه بازگشت مجدد */}
            <section className="border-t border-gold/10 py-8 md:py-12 bg-gradient-to-r from-black/50 via-black/30 to-transparent">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <Link href="/" className="group inline-flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/5 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-center gap-3 px-6 py-3.5 bg-black/40 backdrop-blur-md border border-gold/20 rounded-xl hover:border-gold/50 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 shadow-lg shadow-gold/10 group-hover:shadow-gold/30">
                                <Home className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
                                <ArrowLeft className="w-4 h-4 text-gold/70 group-hover:-translate-x-1 transition-transform duration-300" />
                                <div className="w-px h-5 bg-gold/20" />
                                <span className="text-sm font-medium text-white/80 group-hover:text-gold transition-colors duration-300">
                                    بازگشت به صفحه اصلی
                                </span>
                            </div>
                        </div>
                    </Link>
                    <p className="text-white/30 text-xs mt-4">تمامی پروژه‌های گروه توسعه و ساختمان آرتام سازه</p>
                </div>
            </section>
        </div>
    );
}