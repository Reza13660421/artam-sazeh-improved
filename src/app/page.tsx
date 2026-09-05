import { loadData } from '@/lib/data-service';
import Header from '@/components/layout/Header';
import HeroSlider from '@/components/sections/HeroSlider';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import BlogSection from '@/components/sections/Blog'; // ✅ اضافه شده
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export const revalidate = 3600; // هر ساعت یکبار

export default async function HomePage() {
    const data = await loadData();

    // اسکیمای JSON-LD برای سئو
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "گروه توسعه و ساختمان آرتام سازه",
        "url": process.env.NEXT_PUBLIC_BASE_URL || 'https://artamsazeh.com',
        "telephone": data.settings.phone,
        "email": data.settings.email,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tehran",
            "addressCountry": "IR"
        },
        "foundingDate": "1387",
        "description": "پیشرو در مشارکت در ساخت و ساختمان‌سازی در تهران"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header settings={data.settings} />
            <main>
                {/* اسلایدر */}
                <HeroSlider slides={data.slides} />
                {/* درباره ما */}
                <About />
                <Services services={data.services} />
                <Projects projects={data.projects} />
                <Testimonials testimonials={data.testimonials} />
                {/* ✅ بخش بلاگ اضافه شد */}
                <BlogSection blogs={data.blogs} />
                <Contact settings={data.settings} />
            </main>
            <Footer settings={data.settings} />
        </>
    );
}