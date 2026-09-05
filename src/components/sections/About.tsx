import Image from 'next/image';
import { Award, Sparkles, Crown, Building2, ShieldCheck, Clock, Gem, FileCheck } from 'lucide-react';

const features = [
    { icon: ShieldCheck, title: 'کیفیت برتر مصالح', desc: 'بهترین متریال روز دنیا' },
    { icon: FileCheck, title: 'مهندسی دقیق', desc: 'نظارت عالیه در تمام مراحل' },
    { icon: Clock, title: 'تحویل به موقع', desc: 'تعهد کامل به زمان‌بندی' },
    { icon: Gem, title: 'پشتیبانی کامل', desc: 'خدمات پس از ساخت و ضمانت' },
    { icon: Building2, title: 'شفافیت مالی', desc: 'قرارداد شفاف مشارکت' },
    { icon: Sparkles, title: 'پوشش کامل تهران', desc: 'اجرای پروژه در تمام مناطق' },
];

export default function About() {
    return (
        <section id="about" className="py-12 md:py-16 bg-background/80 relative overflow-hidden">
            {/* پس‌زمینه تزئینی */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gold/3 blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                {/* قاب واحد برای متن و تصویر */}
                <div className="relative bg-card/60 backdrop-blur-sm border-2 border-gold/20 rounded-[2rem] p-1.5 md:p-2 shadow-xl shadow-gold/10 hover:shadow-gold/20 transition-all duration-700 overflow-hidden">

                    {/* خطوط تزئینی بالای قاب */}
                    <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-gold/0 via-gold/60 to-gold/0" />
                    <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-gold/30 rounded-tr-3xl pointer-events-none" />
                    <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl pointer-events-none" />

                    {/* داخل قاب: گرید دو ستونه */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

                        {/* ستون متن */}
                        <div className="p-4 md:p-6 flex flex-col justify-center order-2 lg:order-1">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                                    <Sparkles className="w-3 h-3 text-gold" />
                                    <span className="text-gold text-[10px] font-bold tracking-wider uppercase">درباره ما</span>
                                </div>
                                <div className="flex-1 h-px bg-gradient-to-l from-gold/30 to-transparent" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold leading-tight text-foreground mb-2">
                                گروه توسعه و ساختمان <br />
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-gold via-gold-light to-gold">
                                    آرتام سازه
                                    <span className="absolute -bottom-1 right-0 w-full h-0.5 bg-gradient-to-l from-gold to-transparent rounded-full" />
                                </span>
                            </h2>

                            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                                <strong className="text-gold font-semibold">گروه توسعه و ساختمان آرتام سازه</strong> با بیش از <span className="text-gold font-semibold">۱۵ سال تجربه درخشان</span> در صنعت <strong className="text-foreground">ساخت و ساز</strong>، به عنوان یکی از مجموعه‌های معتبر در حوزه <strong className="text-foreground">ساختمان‌سازی</strong> و <strong className="text-foreground">مشارکت در ساخت</strong> در تهران شناخته می‌شود.
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                ما با تکیه بر دانش فنی روز و تیم متخصص، پروژه‌هایی با کیفیت بالا و مطابق با استانداردهای جهانی اجرا می‌کنیم.
                            </p>

                            {/* شبکه ویژگی‌ها */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="group flex items-center gap-2 p-2.5 rounded-lg bg-background/40 border border-border/40 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 hover:shadow-md hover:shadow-gold/5 hover:-translate-y-0.5">
                                        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                                            <feature.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-foreground">{feature.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* نوار پایین: دکمه + آمار */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/30">
                                <a href="#contact" className="group inline-flex items-center gap-2 bg-gradient-to-l from-gold via-gold-light to-gold-dark text-black font-bold px-5 py-2.5 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-gold/30 text-sm">
                                    دریافت مشاوره رایگان
                                    <Crown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </a>
                                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <Award className="w-3.5 h-3.5 text-gold" />
                                        <span>۱۵+ سال تجربه</span>
                                    </div>
                                    <div className="w-px h-3 bg-border" />
                                    <div className="flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5 text-gold" />
                                        <span>۴۸ پروژه موفق</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ستون تصویر - داخل قاب */}
                        <div className="relative group rounded-2xl overflow-hidden border border-gold/20 bg-black/20 flex items-center justify-center lg:h-full min-h-[250px] order-1 lg:order-2 p-4">
                            {/* تغییر مهم: object-contain برای نمایش کامل تصویر بدون برش */}
                            <Image
                                src="/images/about.jpg"
                                alt="گروه ساختمانی آرتام سازه"
                                fill
                                className="object-contain transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* نشان افتخار روی تصویر */}
                            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-gold/30 rounded-xl px-4 py-2 shadow-xl shadow-gold/20 flex items-center gap-2 group-hover:scale-105 transition-all duration-300 z-10">
                                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                                    <Award className="w-4 h-4 text-gold" />
                                </div>
                                <div className="text-right">
                                    <p className="text-gold font-bold text-xs">بیش از ۱۵ سال</p>
                                    <p className="text-white/60 text-[9px]">تجربه در ساخت و ساز</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}