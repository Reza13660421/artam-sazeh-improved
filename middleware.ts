import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './src/lib/auth';

const PUBLIC_PATHS = ['/api/auth/login', '/api/auth/logout', '/api/consultations'];
const ADMIN_PATHS = ['/api/data', '/admin', '/api/auth/me'];

export async function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;
const method = request.method;

    // مسیرهای عمومی بدون احراز هویت
    if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
        const response = NextResponse.next();
        // ✅ افزودن هدر CSP برای مسیرهای عمومی
        response.headers.set(
            'Content-Security-Policy',
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
        );
        return response;
    }

    // مسیرهای مدیریتی نیاز به توکن دارند
    if (ADMIN_PATHS.some(p => pathname.startsWith(p)) || pathname.startsWith('/api/')) {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        try {
            await verifyToken(token);
        } catch {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // CSRF برای درخواست‌های غیر از GET و غیر از مسیرهای عمومی
        if (method === 'POST' && !pathname.startsWith('/api/auth/login') && !pathname.startsWith('/api/auth/logout')) {
            const csrfCookie = request.cookies.get('csrf_token')?.value;
            const csrfHeader = request.headers.get('x-csrf-token');
            if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
                return NextResponse.json({ error: 'CSRF token mismatch' }, { status: 403 });
            }
        }

        const response = NextResponse.next();
        // ✅ افزودن CSP برای مسیرهای مدیریتی (با محدودیت بیشتر)
        response.headers.set(
            'Content-Security-Policy',
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
        );
        return response;
    }

    const response = NextResponse.next();
    // ✅ افزودن CSP پیش‌فرض برای بقیه مسیرها
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
    );
    return response;
}

export const config = {
    matcher: ['/api/:path*', '/admin/:path*', '/:path*'],
};
