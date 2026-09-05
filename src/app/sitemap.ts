import { MetadataRoute } from 'next';
import { loadData } from '@/lib/data-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://artamsazeh.com';
    const data = await loadData();

    const staticRoutes = ['', '/all-projects'];
    const projectRoutes = data.projects.map(project => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));
    const blogRoutes = data.blogs.map(blog => ({
        url: `${baseUrl}/blog/${blog.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        ...staticRoutes.map(route => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        })),
        ...projectRoutes,
        ...blogRoutes,
    ];
}