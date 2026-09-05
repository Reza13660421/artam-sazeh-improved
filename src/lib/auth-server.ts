import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from './db';

const secretEnv = process.env.JWT_SECRET;
if (!secretEnv) {
    throw new Error('JWT_SECRET environment variable is not set');
}
const secret = new TextEncoder().encode(secretEnv);

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

export async function getAuthUser() {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return null;
    const payload = await verifyToken(token);
    if (!payload) return null;
    const user = await prisma.admin.findUnique({
        where: { id: payload.id as number },
        select: { id: true, fullName: true, username: true, role: true, phone: true, permissions: true },
    });
    return user;
}

export async function setAuthCookie(token: string) {
    const cookieStore = cookies();
    cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 روز
        path: '/',
    });
}

export async function clearAuthCookie() {
    const cookieStore = cookies();
    cookieStore.delete('admin_token');
}