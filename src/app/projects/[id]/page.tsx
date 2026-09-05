import { loadData } from '@/lib/data-service';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    MapPin,
    ArrowLeft,
    Calendar,
    Ruler,
    Building2,
    Award,
    CheckCircle,
    Clock,
    Home,
    Sparkles,
    Crown,
    Gem,
    ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const revalidate = 3600; // هر ساعت یکبار

// تولید متادیتا برای سئوی هر پروژه
export async function generateMetadata({ params }: { params: { id: string } }) {
    const data = await loadData();
    const project = data.projects.find((p) => p.id === parseInt(params.id));
    if (!project) return { title: 'پروژه یافت نشد' };

    return {
        title: `${project.name} | پروژه‌های آرتام سازه`,
        description: project.description || `مشاهده جزئیات پروژه ${project.name} در منطقه ${project.location} تهران`,
        keywords: [project.name, project.location, 'پروژه ساختمانی', 'مشارکت در ساخت', 'آرتام سازه'],
        openGraph: {
            title: `${project.name} | آرتام سازه`,
            description: project.description || `پروژه ساختمانی در منطقه ${project.location}`,
            images: project.image ? [{ url: project.image }] : [],
        },
        alternates: {
            canonical: `/projects/${project.id}`,
        },
    };
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const data = await loadData();
    const project = data.projects.find((p) => p.id === parseInt(params.id));
    if (!project) notFound();

    const validImage = project.image && project.image.trim() !== '' && project.image.startsWith('/images/');
    const projectImage = validImage ? project.image : '/images/fallback.jpg';

    const projectDetails = {
        area: '۲۵۰ - ۴۵۰ متر مربع',
        floors: '۸ طبقه + ۲ طبقه زیرزمین',
        units: '۱۲ واحد مسکونی',
        parking: '۲ پارکینگ اختصاصی',
        elevator: '۲ آسانسور',
        heating: 'موتورخانه اختصاصی',
        cooling: 'چیلر و فن‌کویل',
        facade: 'نمای کامپوزیت و سنگ',
        startDate: '۱۴۰۲/۰۲/۱۵',
        estimatedFinish: '۱۴۰۴/۰۶/۳۰',
        status: project.status,
        progress: project.progress,
        features: [
            'سیستم هوشمند ساختمان',
            'استخر و جکوزی',
            'سالن ورزشی مجهز',
            'فضای سبز اختصاصی',
            'دوربین مداربسته',
            'انژکتور گاز',
            'سیستم اعلام حریق',
            'ژنراتور اضطراری',
        ],
        timeline: [
            { phase: 'مطالعات و طراحی', date: '۱۴۰۲/۰۱ - ۱۴۰۲/۰۳', status: 'completed' },
            { phase: 'عملیات گودبرداری', date: '۱۴۰۲/۰۴ - ۱۴۰۲/۰۶', status: 'completed' },
            { phase: 'اسکلت‌سازی', date: '۱۴۰۲/۰۷ - ۱۴۰۳/۰۱', status: 'completed' },
            { phase: 'تأسیسات و نازک‌کاری', date: '۱۴۰۳/۰۲ - ۱۴۰۳/۱۰', status: 'in-progress' },
            { phase: 'محوطه‌سازی و تحویل', date: '۱۴۰۳/۱۱ - ۱۴۰۴/۰۳', status: 'pending' },
        ],
    };

    const statusColors = {
        'در حال ساخت': 'from-yellow-500/20 via-yellow-500/10 to-transparent border-yellow-500/30 text-yellow-500',
        'تحویل شده': 'from-green-500/20 via-green-500/10 to-transparent border-green-500/30 text-green-500',
        'آغاز به کار': 'from-blue-500/20 via-blue-500/10 to-transparent border-blue-500/30 text-blue-500',
    };

    const statusIcon = {
        'در حال ساخت': <Clock className="w-5 h-5" />,
        'تحویل شده': <CheckCircle className="w-5 h-5" />,
        'آغاز به کار': <Sparkles className="w-5 h-5" />,
    };

    // اسکیمای JSON-LD برای پروژه
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": project.name,
        "description": project.description,
        "image": project.image,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": project.location,
            "addressCountry": "IR"
        },
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://artamsazeh.com'}/projects/${project.id}`
    };

    return (
        <div className="min-h-screen bg-background">
            {/* اسکیمای JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* هدر بزرگ با تصویر پروژه */}
            <header className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={projectImage}
                        alt={project.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                    <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gold/3 blur-3xl" />
                </div>

                <div className="absolute inset-0 flex items-end pb-12 md:pb-20 px-6 md:px-12 lg:px-20">
                    <div className="max-w-4xl">
                        {/* دکمه بازگشت */}
                        <div className="mb-4">
                            <Link href="/#projects" className="group inline-flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/5 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative flex items-center gap-3 px-4 py-2.5 bg-black/40 backdrop-blur-md border border-gold/20 rounded-xl hover:border-gold/50 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 shadow-lg shadow-gold/10 group-hover:shadow-gold/30">
                                        <div className="flex items-center gap-2">
                                            <ChevronLeft className="w-4 h-4 text-gold/70 group-hover:-translate-x-1 transition-transform duration-300" />
                                            <ArrowLeft className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div className="w-px h-5 bg-gold/20" />
                                        <span className="text-sm font-medium text-white/80 group-hover:text-gold transition-colors duration-300">
                                            بازگشت به پروژه‌ها
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                            <span
                                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border bg-black/40 backdrop-blur-sm ${statusColors[project.status as keyof typeof statusColors] || 'from-gray-500/20 border-gray-500/30 text-gray-400'
                                    }`}
                            >
                                {statusIcon[project.status as keyof typeof statusIcon] || <Sparkles className="w-4 h-4" />}
                                {project.status}
                            </span>
                            <span className="text-white/60 text-sm flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-gold" />
                                پیشرفت {project.progress}%
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] drop-shadow-2xl">
                            {project.name}
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl mt-3 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-gold" />
                            تهران، {project.location}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-2 text-white/60 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5">
                                <Ruler className="w-4 h-4 text-gold" />
                                {projectDetails.area}
                            </div>
                            <div className="flex items-center gap-2 text-white/60 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5">
                                <Building2 className="w-4 h-4 text-gold" />
                                {projectDetails.floors}
                            </div>
                            <div className="flex items-center gap-2 text-white/60 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5">
                                <Home className="w-4 h-4 text-gold" />
                                {projectDetails.units}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                    <div
                        className="h-full bg-gradient-to-r from-gold to-gold-light rounded-r-full transition-all duration-1000"
                        style={{ width: `${Math.min(100, Math.max(0, project.progress))}%` }}
                    />
                </div>
            </header>

            <main className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
                {/* محتوای اصلی - مشابه نسخه قبلی با بهبودهای کوچک */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* درباره پروژه */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
                                <Crown className="w-5 h-5" />
                                درباره پروژه
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                {project.description || 'پروژه‌ی آپارتمانی لوکس با طراحی مدرن و امکانات کامل در بهترین منطقه‌ی تهران.'}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
                                <div>
                                    <div className="text-xs text-muted-foreground">شروع پروژه</div>
                                    <div className="text-sm font-semibold text-foreground">{projectDetails.startDate}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">تخمین تحویل</div>
                                    <div className="text-sm font-semibold text-foreground">{projectDetails.estimatedFinish}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">وضعیت</div>
                                    <div className="text-sm font-semibold text-foreground">{project.status}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">پیشرفت</div>
                                    <div className="text-sm font-semibold text-gold">{project.progress}%</div>
                                </div>
                            </div>
                        </div>

                        {/* مشخصات فنی */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
                                <Gem className="w-5 h-5" />
                                مشخصات فنی
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                                    <div className="text-xs text-muted-foreground">متراژ واحدها</div>
                                    <div className="text-sm font-semibold text-foreground">{projectDetails.area}</div>
                                </div>
                                <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                                    <div className="text-xs text-muted-foreground">تعداد واحدها</div>
                                    <div className="text-sm font-semibold text-foreground">{projectDetails.units}</div>
                                </div>
                                <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                                    <div className="text-xs text-muted-foreground">طبقات</div>
                                    <div className="text-sm font-semibold text-foreground">{projectDetails.floors}</div>
                                </div>
                                <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                                    <div className="text-xs text-muted-foreground">پارکینگ</div>
                                    <div className="text-sm font-semibold text-foreground">{projectDetails.parking}</div>
                                </div>
                                <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                                    <div className="text-xs text-muted-foreground">آسانسور</div>
                                    <div className="text-sm font-semibold text-foreground">{projectDetails.elevator}</div>
                                </div>
                                <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                                    <div className="text-xs text-muted-foreground">نمای ساختمان</div>
                                    <div className="text-sm font-semibold text-foreground">{projectDetails.facade}</div>
                                </div>
                            </div>
                        </div>

                        {/* امکانات */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                امکانات و تجهیزات
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {projectDetails.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground bg-background/30 rounded-lg px-3 py-2">
                                        <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* زمان‌بندی */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                زمان‌بندی پروژه
                            </h2>
                            <div className="relative">
                                <div className="absolute right-3 top-0 bottom-0 w-0.5 bg-border/50" />
                                {projectDetails.timeline.map((item, index) => (
                                    <div key={index} className="relative pr-8 pb-6 last:pb-0">
                                        <div
                                            className={`absolute right-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 ${item.status === 'completed'
                                                ? 'bg-gold border-gold'
                                                : item.status === 'in-progress'
                                                    ? 'bg-gold/50 border-gold animate-pulse'
                                                    : 'bg-background border-border'
                                                }`}
                                        />
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                                            <span className="font-semibold text-foreground">{item.phase}</span>
                                            <span className="text-xs text-muted-foreground">{item.date}</span>
                                            <span
                                                className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'completed'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : item.status === 'in-progress'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-gray-500/20 text-gray-400'
                                                    }`}
                                            >
                                                {item.status === 'completed' ? '✓ انجام شده' : item.status === 'in-progress' ? 'در حال انجام' : 'در انتظار'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* سایدبار */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-card border border-gold/20 rounded-2xl p-6">
                            <div className="text-center pb-4 border-b border-border/50">
                                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gold mb-3 bg-background/80 flex items-center justify-center relative">
                                    {validImage ? (
                                        <Image
                                            src={project.image!}
                                            alt={project.name}
                                            width={80}
                                            height={80}
                                            className="object-cover w-full h-full"
                                            sizes="80px"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gold/10 text-gold text-2xl font-bold">
                                            {project.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-foreground">{project.name}</h3>
                                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                                    <MapPin className="w-3 h-3 text-gold" />
                                    تهران، {project.location}
                                </p>
                            </div>

                            <div className="space-y-3 py-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">وضعیت</span>
                                    <span
                                        className={`font-semibold ${project.status === 'تحویل شده'
                                            ? 'text-green-400'
                                            : project.status === 'در حال ساخت'
                                                ? 'text-gold'
                                                : 'text-blue-400'
                                            }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">پیشرفت</span>
                                    <span className="font-semibold text-gold">{project.progress}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">تعداد واحد</span>
                                    <span className="font-semibold text-foreground">{projectDetails.units}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">متراژ</span>
                                    <span className="font-semibold text-foreground">{projectDetails.area}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border/50 space-y-3">
                                <Link href="/#contact">
                                    <Button className="w-full bg-gold hover:bg-gold-dark text-black font-bold">
                                        <Sparkles className="w-4 h-4 ml-2" />
                                        دریافت مشاوره
                                    </Button>
                                </Link>
                                <Link href="/#projects">
                                    <Button variant="outline" className="w-full border-gold/30 text-gold hover:bg-gold hover:text-black">
                                        <ArrowLeft className="w-4 h-4 ml-2" />
                                        بازگشت به پروژه‌ها
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 text-center">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-2xl font-bold text-gold">۱۲</div>
                                    <div className="text-xs text-muted-foreground">واحد مسکونی</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gold">۸</div>
                                    <div className="text-xs text-muted-foreground">طبقه</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gold">۲</div>
                                    <div className="text-xs text-muted-foreground">پارکینگ</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gold">۲</div>
                                    <div className="text-xs text-muted-foreground">آسانسور</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* بخش پایین */}
            <section className="border-t border-gold/10 py-8 md:py-12 bg-gradient-to-r from-black/50 via-black/30 to-transparent">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
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
                    <p className="text-white/30 text-xs mt-4">{project.name} – گروه توسعه و ساختمان آرتام سازه</p>
                </div>
            </section>
        </div>
    );
}