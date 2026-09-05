import { Building2, Ruler, Coins, ThumbsUp } from 'lucide-react';
import type { Service } from '@/types';

const iconMap: Record<string, React.ElementType> = {
    'bi-buildings': Building2,
    'bi-rulers': Ruler,
    'bi-coin': Coins,
    'bi-hand-thumbs-up': ThumbsUp,
};

export default function Services({ services }: { services: Service[] }) {
    return (
        <section id="services" className="py-16 md:py-20 bg-background/40">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-gold text-sm font-semibold tracking-wider border-r-2 border-gold pr-3">
                        خدمات ما
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3">
                        راهکارهای جامع ساختمانی در تهران
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-l from-gold to-transparent mx-auto rounded-full" />
                    <p className="text-muted-foreground mt-4 text-sm">
                        از مشاوره و طراحی تا اجرا و تحویل نهایی، همراه شما در تمام مراحل ساخت و سرمایه‌گذاری
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => {
                        const IconComponent = iconMap[service.icon] || Building2;
                        return (
                            <div
                                key={service.id}
                                className="group bg-card border border-border rounded-2xl p-6 text-center transition-all hover:-translate-y-2 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center text-gold text-3xl transition-all group-hover:bg-gold group-hover:text-black group-hover:scale-110 group-hover:-rotate-3">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}