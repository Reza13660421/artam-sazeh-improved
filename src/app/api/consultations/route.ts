import { NextResponse } from 'next/server';
import { addConsultation } from '@/lib/data-service';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const limitResponse = rateLimit(`consultation:${ip}`, 10, 60_000);
    if (limitResponse) return limitResponse;

    try {
        const body = await request.json();
        const { name, phone, email, subject, message } = body;
        if (!name || !phone || !message) {
            return NextResponse.json({ error: 'نام، شماره تماس و پیام الزامی است' }, { status: 400 });
        }
        await addConsultation({ name, phone, email, subject, message });
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Error in /api/consultations:', error); // ✅ لاگ دقیق
        // ✅ بازگشت پیام خطای واضح‌تر
        return NextResponse.json(
            { error: 'خطا در ثبت درخواست، لطفاً دوباره تلاش کنید' },
            { status: 500 }
        );
    }
}