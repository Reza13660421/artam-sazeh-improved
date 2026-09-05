import { seedDatabase } from '../src/lib/data-service';

async function main() {
    console.log('🌱 شروع seed کردن دیتابیس...');
    await seedDatabase();
    console.log('✅ دیتابیس با موفقیت seed شد.');
}

main()
    .catch((e) => {
        console.error('❌ خطا در seed کردن دیتابیس:', e);
        process.exit(1);
    })
    .finally(async () => {
        const { prisma } = await import('../src/lib/db');
        await prisma.$disconnect();
    });