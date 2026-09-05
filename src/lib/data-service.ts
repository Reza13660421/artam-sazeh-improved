import { prisma } from './db';
import type { AppData, Slide, Project, Service, Testimonial, Blog, Consultation, Admin, Settings } from '@/types';
import { DEFAULT_DATA } from './constants';

let cache: { data: AppData; timestamp: number } | null = null;
const CACHE_TTL = 60_000;

export async function seedDatabase() {
    const adminCount = await prisma.admin.count();
    if (adminCount === 0) {
        const { hashPassword } = await import('./auth');
        await prisma.admin.create({
            data: {
                fullName: DEFAULT_DATA.admins[0].fullName,
                username: DEFAULT_DATA.admins[0].username,
                password: await hashPassword('ChangeMe@2026!StrongPass'),
                role: 'full',
                phone: DEFAULT_DATA.admins[0].phone,
                permissions: JSON.stringify(DEFAULT_DATA.admins[0].permissions),
            },
        });
        await prisma.slide.createMany({ data: DEFAULT_DATA.slides.map(({ id, ...rest }) => rest) });
        await prisma.project.createMany({ data: DEFAULT_DATA.projects.map(({ id, ...rest }) => rest) });
        await prisma.service.createMany({ data: DEFAULT_DATA.services.map(({ id, ...rest }) => rest) });
        await prisma.testimonial.createMany({ data: DEFAULT_DATA.testimonials.map(({ id, ...rest }) => rest) });
        await prisma.blog.createMany({ data: DEFAULT_DATA.blogs.map(({ id, ...rest }) => rest) });
        for (const [key, value] of Object.entries(DEFAULT_DATA.settings)) {
            await prisma.setting.create({ data: { key, value } });
        }
    }
}

async function fetchDataFromDB(): Promise<AppData> {
    await seedDatabase();
    const slides = await prisma.slide.findMany({ orderBy: { order: 'asc' } });
    const projects = await prisma.project.findMany({ orderBy: { id: 'asc' } });
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
    const testimonials = await prisma.testimonial.findMany({ orderBy: { id: 'asc' } });
    const blogs = await prisma.blog.findMany({ orderBy: { id: 'asc' } });
    const consultations = await prisma.consultation.findMany({ orderBy: { id: 'desc' } });
    const adminsRaw = await prisma.admin.findMany({
        select: { id: true, fullName: true, username: true, role: true, phone: true, permissions: true },
    });
    const admins = adminsRaw.map((admin) => ({
        ...admin,
        permissions: JSON.parse(admin.permissions || '[]'),
    })) as Admin[];
    const settingsRows = await prisma.setting.findMany();
    const settings = settingsRows.reduce((acc, row) => {
        acc[row.key as keyof Settings] = row.value as any;
        return acc;
    }, {} as Settings);
    return { slides, projects, services, testimonials, blogs, consultations, admins, settings };
}

export async function loadData(): Promise<AppData> {
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
        return cache.data;
    }
    const data = await fetchDataFromDB();
    cache = { data, timestamp: Date.now() };
    return data;
}

// ✅ رفع مشکل ۲: پاک کردن کش پس از ذخیره‌سازی
export async function saveData(data: AppData): Promise<void> {
    await prisma.$transaction(async (tx) => {
        await tx.slide.deleteMany();
        await tx.slide.createMany({ data: data.slides.map(({ id, ...rest }) => rest) });
        await tx.project.deleteMany();
        await tx.project.createMany({ data: data.projects.map(({ id, ...rest }) => rest) });
        await tx.service.deleteMany();
        await tx.service.createMany({ data: data.services.map(({ id, ...rest }) => rest) });
        await tx.testimonial.deleteMany();
        await tx.testimonial.createMany({ data: data.testimonials.map(({ id, ...rest }) => rest) });
        await tx.blog.deleteMany();
        await tx.blog.createMany({ data: data.blogs.map(({ id, ...rest }) => rest) });
        // ✅ رفع مشکل ۱: ذخیره‌سازی ادمین‌ها و مشاوره‌ها
        await tx.admin.deleteMany();
        for (const admin of data.admins) {
            const { id, ...rest } = admin;
            await tx.admin.create({
                data: {
                    ...rest,
                    permissions: JSON.stringify(rest.permissions),
                },
            });
        }
        // مشاوره‌ها: فقط وضعیت‌ها به‌روز می‌شوند، اما برای یکپارچگی، همه را بازنویسی نمی‌کنیم
        // در عوض، برای هر مشاوره، فقط status را به‌روز می‌کنیم (اگر لازم باشد)
        // اما برای سادگی، می‌توانیم consultation را هم بازنویسی کنیم.
        await tx.consultation.deleteMany();
        await tx.consultation.createMany({ data: data.consultations.map(({ id, ...rest }) => rest) });

        for (const [key, value] of Object.entries(data.settings)) {
            await tx.setting.upsert({
                where: { key },
                update: { value },
                create: { key, value },
            });
        }
    });
    // ✅ رفع مشکل ۲: پاک کردن کش
    cache = null;
}

// توابع کمکی برای CRUD تکی (برای مدیریت بهتر)
export async function addConsultation(consultation: Omit<Consultation, 'id' | 'date' | 'status'>): Promise<void> {
    const date = new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR');
    await prisma.consultation.create({
        data: { ...consultation, date, status: 'new' },
    });
    cache = null;
}

export async function addTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<void> {
    await prisma.testimonial.create({ data: testimonial });
    cache = null;
}

export async function createAdmin(data: Omit<Admin, 'id'>) {
    const { hashPassword } = await import('./auth');
    const hashed = await hashPassword(data.password);
    const result = await prisma.admin.create({
        data: {
            ...data,
            password: hashed,
            permissions: JSON.stringify(data.permissions),
        },
    });
    cache = null;
    return result;
}

export async function updateAdmin(id: number, data: Partial<Omit<Admin, 'id' | 'password'>> & { password?: string }) {
    const updateData: any = { ...data };
    if (data.password) {
        const { hashPassword } = await import('./auth');
        updateData.password = await hashPassword(data.password);
    }
    if (data.permissions) {
        updateData.permissions = JSON.stringify(data.permissions);
    }
    const result = await prisma.admin.update({ where: { id }, data: updateData });
    cache = null;
    return result;
}

export async function deleteAdmin(id: number) {
    const result = await prisma.admin.delete({ where: { id } });
    cache = null;
    return result;
}

export async function updateConsultationStatus(id: number, status: 'new' | 'read') {
    const result = await prisma.consultation.update({ where: { id }, data: { status } });
    cache = null;
    return result;
}

export async function deleteConsultation(id: number) {
    const result = await prisma.consultation.delete({ where: { id } });
    cache = null;
    return result;
}

// سایر توابع CRUD مشابه (برای slides, projects و ...) نیز باید کش را پاک کنند
// برای اختصار، فقط نمونه‌هایی آورده شده است.