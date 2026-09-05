import { NextResponse } from 'next/server';

// استفاده از Map با پاک‌سازی خودکار (بهبود نسبی)
const buckets = new Map<string, { count: number; resetTime: number }>();

// پاک‌سازی خودکار هر ۱۰ دقیقه
setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
        if (bucket.resetTime < now) {
            buckets.delete(key);
        }
    }
}, 600_000);

export function rateLimit(key: string, limit: number, windowMs: number): NextResponse | null {
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetTime < now) {
        buckets.set(key, { count: 1, resetTime: now + windowMs });
        return null;
    }

    if (bucket.count >= limit) {
        return NextResponse.json(
            { error: 'Too many requests, please try again later.' },
            { status: 429 }
        );
    }

    bucket.count++;
    return null;
}

// ✅ برای محیط production، می‌توان از Redis استفاده کرد (پیشنهاد)
// در اینجا یک پیاده‌سازی ساده با Redis (اختیاری) ارائه نمی‌شود تا وابستگی زیاد نشود.