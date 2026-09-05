import Link from 'next/link';
import { ArrowLeft, Newspaper, Sparkles } from 'lucide-react';
import type { Blog } from '@/types';

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
    const displayBlogs = blogs.slice(0, 3);

    return (
        <section id="blog" className="py-16 md:py-20 bg-background/40">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-gold text-sm font-semibold tracking-wider border-r-2 border-gold pr-3">مقالات</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3">آخرین مقالات ساختمانی</h2>
                    <div className="w-16 h-1 bg-gradient-to-l from-gold to-transparent mx-auto rounded-full" />
                    <p className="text-muted-foreground mt-4 text-sm">مطالب تخصصی در حوزه ساخت‌وساز، سرمایه‌گذاری و معماری</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {displayBlogs.map((blog) => (
                        <Link href={`/blog/${blog.id}`} key={blog.id} className="group bg-card border border-border rounded-2xl p-6 transition-all hover:-translate-y-2 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                                    <Newspaper className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground group-hover:text-gold transition-colors">{blog.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{blog.category} • {blog.date}</p>
                                </div>
                            </div>
                            {blog.content && <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{blog.content}</p>}
                            <div className="mt-4 text-gold text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                مطالعه بیشتر <ArrowLeft className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>

                {blogs.length > 3 && (
                    <div className="text-center mt-10">
                        <Link href="/blog">
                            <button className="bg-gold hover:bg-gold-dark text-black font-bold px-6 py-3 rounded-xl transition-all hover:scale-105">
                                مشاهده همه مقالات
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}