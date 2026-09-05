import { NextResponse } from 'next/server';
import { addTestimonial } from '@/lib/data-service';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
    // محدودیت نرخ: حداکثر ۵ درخواست در هر دقیقه برای هر IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const limitResponse = rateLimit(`testimonial:${ip}`, 5, 60_000);
    if (limitResponse) return limitResponse;

    try {
        const body = await request.json();
        const { name, title, rating, text } = body;

        if (!name || !text || !rating) {
            return NextResponse.json({ error: 'نام، امتیاز و متن نظر الزامی است' }, { status: 400 });
        }

        // ذخیره نظر با وضعیت در انتظار تأیید (pending)
        await addTestimonial({
            name,
            title: title || 'کاربر سایت',
            rating: Math.min(5, Math.max(1, Number(rating))),
            text,
            status: 'pending',
            date: new Date().toLocaleDateString('fa-IR'),
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'خطا در ثبت دیدگاه' }, { status: 500 });
    }
}