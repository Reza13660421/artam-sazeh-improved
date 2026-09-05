import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, createToken } from '@/lib/auth';
import { setAuthCookie } from '@/lib/auth-server';
import { rateLimit } from '@/lib/rate-limit';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

// تولید کپچا و ذخیره در کوکی (در سرور)
function generateCaptcha(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(request: Request) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const limitResponse = rateLimit(`login:${ip}`, 5, 60_000);
    if (limitResponse) return limitResponse;

    try {
        const { username, password, captcha } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'نام کاربری و رمز عبور الزامی است' }, { status: 400 });
        }

        // ✅ اعتبارسنجی کپچا در سرور
        const cookieStore = cookies();
        const storedCaptcha = cookieStore.get('captcha_token')?.value;
        if (!storedCaptcha || storedCaptcha !== captcha) {
            return NextResponse.json({ error: 'کد امنیتی اشتباه است' }, { status: 400 });
        }

        const admin = await prisma.admin.findUnique({ where: { username } });
        if (!admin) {
            return NextResponse.json({ error: 'نام کاربری یا رمز عبور اشتباه است' }, { status: 401 });
        }

        const isValid = await verifyPassword(password, admin.password);
        if (!isValid) {
            return NextResponse.json({ error: 'نام کاربری یا رمز عبور اشتباه است' }, { status: 401 });
        }

        const token = await createToken({ id: admin.id, username: admin.username, role: admin.role });
        await setAuthCookie(token);

        // تولید CSRF Token و ذخیره در کوکی
        const csrfToken = randomBytes(32).toString('hex');
        cookies().set('csrf_token', csrfToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        // حذف کپچا پس از موفقیت
        cookies().delete('captcha_token');

        const { password: _, ...user } = admin;
        const userWithPermissions = {
            ...user,
            permissions: JSON.parse(user.permissions || '[]'),
        };

        return NextResponse.json(userWithPermissions);
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
    }
}

// افزودن یک endpoint برای دریافت کپچا
export async function GET() {
    const captcha = generateCaptcha();
    // ذخیره در کوکی با مدت زمان کوتاه (مثلاً ۵ دقیقه)
    cookies().set('captcha_token', captcha, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 300, // 5 دقیقه
        path: '/',
    });
    return NextResponse.json({ captcha });
}