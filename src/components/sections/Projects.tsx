import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types';

export default function Projects({ projects, showAll = false }: { projects: Project[]; showAll?: boolean }) {
    const displayProjects = showAll ? projects : projects.slice(0, 4);

    return (
        <section id="projects" className="py-16 md:py-20 bg-background/80">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-gold text-sm font-semibold tracking-wider border-r-2 border-gold pr-3">
                        پروژه‌های شاخص
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3">
                        آخرین پروژه‌های ساخت و ساز در تهران
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-l from-gold to-transparent mx-auto rounded-full" />
                    <p className="text-muted-foreground mt-4 text-sm">
                        مجموعه‌ای از پروژه‌های موفق <strong>مشارکت در ساخت</strong> و <strong>ساختمان‌سازی</strong> در مناطق
                        مختلف پایتخت
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-card rounded-xl overflow-hidden border border-border hover:border-gold/30 transition-all hover:-translate-y-2 shadow-lg hover:shadow-gold/10"
                        >
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={project.image || '/images/fallback.jpg'}
                                    alt={project.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span
                                    className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg ${project.status === 'تحویل شده'
                                            ? 'bg-green-500/90 text-white'
                                            : project.status === 'در حال ساخت'
                                                ? 'bg-gold/90 text-black'
                                                : 'bg-blue-500/90 text-white'
                                        }`}
                                >
                                    {project.status}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{project.name}</h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="w-4 h-4 text-gold" />
                                    تهران، {project.location}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>پیشرفت</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-border rounded-full mt-1 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-l from-gold to-gold-light rounded-full transition-all duration-1000"
                                            style={{ width: `${Math.min(100, Math.max(0, project.progress))}%` }}
                                        />
                                    </div>
                                </div>
                                <Link href={`/projects/${project.id}`}>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-4 border-gold text-gold hover:bg-gold hover:text-black text-sm font-bold group/btn"
                                    >
                                        <ArrowLeft className="w-4 h-4 ml-2 transition-transform group-hover/btn:-translate-x-1" />
                                        مشاهده جزئیات
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {!showAll && (
                    <div className="text-center mt-10">
                        <Link href="/all-projects">
                            <Button className="bg-gold hover:bg-gold-dark text-black font-bold">
                                <ArrowLeft className="w-4 h-4 ml-2" />
                                مشاهده همه پروژه‌ها
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}