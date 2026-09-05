import { loadData } from '@/lib/data-service';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Home } from 'lucide-react';

export const revalidate = 3600; // هر ساعت یکبار

export async function generateMetadata({ params }: { params: { id: string } }) {
    const data = await loadData();
    const blog = data.blogs.find((b) => b.id === parseInt(params.id));
    if (!blog) return { title: 'مقاله یافت نشد' };

    return {
        title: `${blog.title} | مقالات آرتام سازه`,
        description: `مطالعه مقاله تخصصی در مورد ${blog.category} در وبسایت گروه توسعه و ساختمان آرتام سازه`,
        keywords: [blog.title, blog.category, 'آرتام سازه', 'مقالات ساختمانی'],
        alternates: {
            canonical: `/blog/${blog.id}`,
        },
    };
}

export default async function BlogPage({ params }: { params: { id: string } }) {
    const data = await loadData();
    const blog = data.blogs.find((b) => b.id === parseInt(params.id));
    if (!blog) notFound();

    return (
        <div className="min-h-screen bg-background">
            <header className="relative bg-gradient-to-r from-black via-black/95 to-black/90 border-b border-gold/10 py-12 md:py-16 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gold/3 blur-3xl" />
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <Link href="/#blog" className="group inline-flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/5 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-center gap-3 px-5 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-xl hover:border-gold/50 transition-all duration-300">
                                <ArrowLeft className="w-4 h-4 text-gold" />
                                <div className="w-px h-5 bg-gold/20" />
                                <span className="text-sm font-medium text-white/80 group-hover:text-gold">بازگشت به مقالات</span>
                            </div>
                        </div>
                    </Link>
                    <div className="mt-6 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{blog.title}</h1>
                        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-gold" />
                                {blog.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <Tag className="w-4 h-4 text-gold" />
                                {blog.category}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-8 py-12 max-w-3xl">
                <div className="bg-card border border-border rounded-2xl p-6 md:p-10">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed">
                            {blog.content ||
                                `این مقاله در مورد ${blog.category} نوشته شده است. محتوای کامل مقاله در اینجا قرار می‌گیرد. جهت مطالعه دقیق‌تر و دریافت مشاوره تخصصی، با تیم آرتام سازه تماس بگیرید.`}
                        </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-border/50 text-center">
                        <Link href="/#contact">
                            <button className="bg-gold hover:bg-gold-dark text-black font-bold px-8 py-3 rounded-xl transition-all hover:scale-105">
                                دریافت مشاوره تخصصی
                            </button>
                        </Link>
                    </div>
                </div>
            </main>

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
                </div>
            </section>
        </div>
    );
}