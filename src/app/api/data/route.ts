import { NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/data-service';
import { getAuthUser } from '@/lib/auth-server';

export async function GET() {
    try {
        const data = await loadData();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: 'خطا در خواندن داده' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'full') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    try {
        const body = await request.json();
        await saveData(body);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'خطا در ذخیره داده' }, { status: 500 });
    }
}