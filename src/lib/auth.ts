import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const secretEnv = process.env.JWT_SECRET;
if (!secretEnv) {
    throw new Error('JWT_SECRET environment variable is not set');
}
const secret = new TextEncoder().encode(secretEnv);

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
}

export async function createToken(payload: { id: number; username: string; role: string }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}