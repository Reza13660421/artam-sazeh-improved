'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import DataTable from './DataTable';
import Modal from './Modal';
import type { AppData, Slide, Project, Service, Testimonial, Blog, Consultation, Admin, Settings } from '@/types';
import {
    LayoutDashboard,
    Image as ImageIcon,
    Building2,
    Wrench,
    MessageSquare,
    Newspaper,
    Inbox,
    Users,
    Settings as SettingsIcon,
    Plus,
    Save,
    RefreshCw,
    Sparkles,
    LogOut,
} from 'lucide-react';

type Tab = 'dashboard' | 'slides' | 'projects' | 'services' | 'testimonials' | 'blog' | 'consultations' | 'admins' | 'settings';

const loadData = async () => {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('Failed to load data');
    return res.json();
};

const saveData = async (data: AppData) => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf_token='))
        ?.split('=')[1];

    const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': csrfToken || '',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to save data');
};

const ALL_PERMISSIONS = [
    { key: 'slides', label: 'اسلایدها' },
    { key: 'projects', label: 'پروژه‌ها' },
    { key: 'services', label: 'خدمات' },
    { key: 'testimonials', label: 'نظرات' },
    { key: 'blog', label: 'مقالات' },
    { key: 'consultations', label: 'درخواست‌ها' },
    { key: 'admins', label: 'ادمین‌ها' },
    { key: 'settings', label: 'تنظیمات' },
];

const ALL_PERMISSION_KEYS = ALL_PERMISSIONS.map(p => p.key);

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [data, setData] = useState<AppData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [message, setMessage] = useState('');
    const [modal, setModal] = useState<{ type: 'edit' | 'add'; data?: any; title: string } | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadData().then((d) => {
            setData(d);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const handleSave = async (newData?: AppData) => {
        const dataToSave = newData || data;
        if (!dataToSave) return;
        setIsSaving(true);
        try {
            await saveData(dataToSave);
            setMessage('✅ تغییرات با موفقیت ذخیره شد.');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage('❌ خطا در ذخیره تغییرات.');
            setTimeout(() => setMessage(''), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    const openAddModal = (title: string, data: any = {}) => {
        setModal({ type: 'add', title, data });
        setFormData(data);
    };

    const openEditModal = (title: string, item: any) => {
        setModal({ type: 'edit', title, data: item });
        setFormData(item);
    };

    const handleModalSubmit = () => {
        if (!modal || !data) return;

        // حذف id از فرم‌دیتا تا دیتابیس خودش id درست تولید کند
        const { id: _removedId, ...cleanFormData } = formData;

        // منطق ویژه برای ادمین‌ها
        if (activeTab === 'admins') {
            const adminData = { ...cleanFormData };
            if (adminData.role === 'full') {
                adminData.permissions = ALL_PERMISSION_KEYS;
            }

            if (modal.type === 'add') {
                const newAdmin: Admin = { id: 0, ...adminData }; // id موقت (0) - دیتابیس خودش تولید می‌کند
                const updated = { ...data, admins: [...data.admins, newAdmin] };
                setData(updated);
                handleSave(updated);
            } else {
                const id = modal.data.id;
                const updated = { ...data, admins: data.admins.map(a => a.id === id ? { ...a, ...adminData } : a) };
                setData(updated);
                handleSave(updated);
            }
            setModal(null);
            return;
        }

        if (modal.type === 'add') {
            if (activeTab === 'slides') {
                const newSlide: Slide = { id: 0, ...cleanFormData };
                const updated = { ...data, slides: [...data.slides, newSlide] };
                setData(updated);
                handleSave(updated);
            } else if (activeTab === 'projects') {
                const newProject: Project = { id: 0, ...cleanFormData };
                const updated = { ...data, projects: [...data.projects, newProject] };
                setData(updated);
                handleSave(updated);
            } else if (activeTab === 'services') {
                const newService: Service = { id: 0, ...cleanFormData };
                const updated = { ...data, services: [...data.services, newService] };
                setData(updated);
                handleSave(updated);
            } else if (activeTab === 'testimonials') {
                const newTestimonial: Testimonial = { id: 0, status: 'approved', rating: 5, ...cleanFormData };
                const updated = { ...data, testimonials: [...data.testimonials, newTestimonial] };
                setData(updated);
                handleSave(updated);
            } else if (activeTab === 'blog') {
                const newBlog: Blog = { id: 0, ...cleanFormData };
                const updated = { ...data, blogs: [...data.blogs, newBlog] };
                setData(updated);
                handleSave(updated);
            }
        } else if (modal.type === 'edit') {
            const id = modal.data.id;
            if (activeTab === 'slides') {
                const updated = { ...data, slides: data.slides.map(s => s.id === id ? { ...s, ...cleanFormData } : s) };
                setData(updated);
                handleSave(updated);
            } else if (activeTab === 'projects') {
                const updated = { ...data, projects: data.projects.map(p => p.id === id ? { ...p, ...cleanFormData } : p) };
                setData(updated);
                handleSave(updated);
            } else if (activeTab === 'services') {
                const updated = { ...data, services: data.services.map(s => s.id === id ? { ...s, ...cleanFormData } : s) };
                setData(updated);
                handleSave(updated);
            } else if (activeTab === 'testimonials') {
                const updated = { ...data, testimonials: data.testimonials.map(t => t.id === id ? { ...t, ...cleanFormData } : t) };
                setData(updated);
                handleSave(updated);
            } else if (activeTab === 'blog') {
                const updated = { ...data, blogs: data.blogs.map(b => b.id === id ? { ...b, ...cleanFormData } : b) };
                setData(updated);
                handleSave(updated);
            }
        }
        setModal(null);
    };

    const handleDelete = (id: number, section: string) => {
        if (!confirm('آیا از حذف این آیتم مطمئن هستید؟')) return;
        if (section === 'slides') {
            const updated = { ...data!, slides: data!.slides.filter(s => s.id !== id) };
            setData(updated);
            handleSave(updated);
        } else if (section === 'projects') {
            const updated = { ...data!, projects: data!.projects.filter(p => p.id !== id) };
            setData(updated);
            handleSave(updated);
        } else if (section === 'services') {
            const updated = { ...data!, services: data!.services.filter(s => s.id !== id) };
            setData(updated);
            handleSave(updated);
        } else if (section === 'testimonials') {
            const updated = { ...data!, testimonials: data!.testimonials.filter(t => t.id !== id) };
            setData(updated);
            handleSave(updated);
        } else if (section === 'blog') {
            const updated = { ...data!, blogs: data!.blogs.filter(b => b.id !== id) };
            setData(updated);
            handleSave(updated);
        } else if (section === 'consultations') {
            const updated = { ...data!, consultations: data!.consultations.filter(c => c.id !== id) };
            setData(updated);
            handleSave(updated);
        } else if (section === 'admins') {
            const updated = { ...data!, admins: data!.admins.filter(a => a.id !== id) };
            setData(updated);
            handleSave(updated);
        }
    };

    const handleApprove = (id: number) => {
        const updated = { ...data!, testimonials: data!.testimonials.map(t => t.id === id ? { ...t, status: 'approved' } : t) };
        setData(updated);
        handleSave(updated);
    };

    const handleReject = (id: number) => {
        const updated = { ...data!, testimonials: data!.testimonials.map(t => t.id === id ? { ...t, status: 'rejected' } : t) };
        setData(updated);
        handleSave(updated);
    };

    const handleMarkRead = (id: number) => {
        const updated = { ...data!, consultations: data!.consultations.map(c => c.id === id ? { ...c, status: 'read' } : c) };
        setData(updated);
        handleSave(updated);
    };

    if (loading || !data) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <RefreshCw className="w-8 h-8 text-gold animate-spin mx-auto mb-3" />
                <p className="text-muted-foreground">در حال بارگذاری...</p>
            </div>
        </div>
    );

    // تعریف تب‌ها
    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'slides', label: 'اسلایدها', icon: <ImageIcon className="w-4 h-4" /> },
        { id: 'projects', label: 'پروژه‌ها', icon: <Building2 className="w-4 h-4" /> },
        { id: 'services', label: 'خدمات', icon: <Wrench className="w-4 h-4" /> },
        { id: 'testimonials', label: 'نظرات', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'blog', label: 'مقالات', icon: <Newspaper className="w-4 h-4" /> },
        { id: 'consultations', label: 'درخواست‌ها', icon: <Inbox className="w-4 h-4" /> },
    ];

    if (user?.role === 'full') {
        tabs.push({ id: 'admins', label: 'ادمین‌ها', icon: <Users className="w-4 h-4" /> });
        tabs.push({ id: 'settings', label: 'تنظیمات', icon: <SettingsIcon className="w-4 h-4" /> });
    }

    // رندر داشبورد
    const renderDashboard = () => {
        const stats = [
            { label: 'اسلایدها', value: data.slides.length, icon: <ImageIcon className="w-5 h-5" /> },
            { label: 'پروژه‌ها', value: data.projects.length, icon: <Building2 className="w-5 h-5" /> },
            { label: 'خدمات', value: data.services.length, icon: <Wrench className="w-5 h-5" /> },
            { label: 'نظرات', value: data.testimonials.length, icon: <MessageSquare className="w-5 h-5" /> },
            { label: 'مقالات', value: data.blogs.length, icon: <Newspaper className="w-5 h-5" /> },
            { label: 'درخواست‌ها', value: data.consultations.length, icon: <Inbox className="w-5 h-5" /> },
        ];

        const pending = data.testimonials.filter((t) => t.status === 'pending').length;
        const unread = data.consultations.filter((c) => c.status === 'new').length;

        return (
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center hover:border-gold/20 transition">
                            <div className="text-gold flex justify-center mb-1">{stat.icon}</div>
                            <div className="text-2xl font-black text-gold">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                    <h4 className="text-gold font-bold mb-3">📊 خلاصه</h4>
                    <p className="text-sm text-muted-foreground">
                        {pending > 0 && <span className="block">⏳ {pending} نظر در انتظار تأیید</span>}
                        {unread > 0 && <span className="block">📩 {unread} درخواست خوانده نشده</span>}
                        {pending === 0 && unread === 0 && <span>همه موارد به‌روز هستند.</span>}
                    </p>
                </div>
            </div>
        );
    };

    // رندر محتوای تب‌ها
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return renderDashboard();
            case 'slides':
                return (
                    <div>
                        <button
                            onClick={() => openAddModal('افزودن اسلاید جدید', { active: true, order: data.slides.length })}
                            className="bg-gold hover:bg-gold-dark text-black font-bold px-6 py-2 rounded-xl mb-6 transition flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> افزودن اسلاید
                        </button>
                        <DataTable
                            data={data.slides}
                            columns={[
                                { key: 'title', label: 'عنوان' },
                                {
                                    key: 'active', label: 'وضعیت', render: (item: Slide) => (
                                        <span className={`px-2 py-0.5 rounded text-xs ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {item.active ? 'فعال' : 'غیرفعال'}
                                        </span>
                                    )
                                },
                            ]}
                            onEdit={(item) => openEditModal('ویرایش اسلاید', item)}
                            onDelete={(id) => handleDelete(id, 'slides')}
                        />
                    </div>
                );
            case 'projects':
                return (
                    <div>
                        <button
                            onClick={() => openAddModal('افزودن پروژه جدید', { progress: 0, status: 'در حال ساخت' })}
                            className="bg-gold hover:bg-gold-dark text-black font-bold px-6 py-2 rounded-xl mb-6 transition flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> افزودن پروژه
                        </button>
                        <DataTable
                            data={data.projects}
                            columns={[
                                { key: 'name', label: 'نام پروژه' },
                                { key: 'location', label: 'موقعیت' },
                                { key: 'status', label: 'وضعیت' },
                                { key: 'progress', label: 'پیشرفت', render: (item: Project) => `${item.progress}%` },
                            ]}
                            onEdit={(item) => openEditModal('ویرایش پروژه', item)}
                            onDelete={(id) => handleDelete(id, 'projects')}
                        />
                    </div>
                );
            case 'services':
                return (
                    <div>
                        <button
                            onClick={() => openAddModal('افزودن خدمت جدید', { icon: 'bi-buildings' })}
                            className="bg-gold hover:bg-gold-dark text-black font-bold px-6 py-2 rounded-xl mb-6 transition flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> افزودن خدمت
                        </button>
                        <DataTable
                            data={data.services}
                            columns={[
                                { key: 'title', label: 'عنوان' },
                                { key: 'desc', label: 'توضیحات' },
                            ]}
                            onEdit={(item) => openEditModal('ویرایش خدمت', item)}
                            onDelete={(id) => handleDelete(id, 'services')}
                        />
                    </div>
                );
            case 'testimonials':
                return (
                    <div>
                        <button
                            onClick={() => openAddModal('افزودن نظر جدید', { status: 'approved', rating: 5 })}
                            className="bg-gold hover:bg-gold-dark text-black font-bold px-6 py-2 rounded-xl mb-6 transition flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> افزودن نظر
                        </button>
                        <DataTable
                            data={data.testimonials}
                            columns={[
                                { key: 'name', label: 'نام' },
                                { key: 'title', label: 'عنوان' },
                                {
                                    key: 'status', label: 'وضعیت', render: (item: Testimonial) => (
                                        <span className={`px-2 py-0.5 rounded text-xs ${item.status === 'approved' ? 'bg-green-500/20 text-green-400' : item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {item.status === 'approved' ? 'تأیید شده' : item.status === 'pending' ? 'در انتظار' : 'رد شده'}
                                        </span>
                                    )
                                },
                            ]}
                            onEdit={(item) => openEditModal('ویرایش نظر', item)}
                            onDelete={(id) => handleDelete(id, 'testimonials')}
                            onApprove={(id) => handleApprove(id)}
                            onReject={(id) => handleReject(id)}
                        />
                    </div>
                );
            case 'blog':
                return (
                    <div>
                        <button
                            onClick={() => openAddModal('افزودن مقاله جدید', { date: new Date().toLocaleDateString('fa-IR') })}
                            className="bg-gold hover:bg-gold-dark text-black font-bold px-6 py-2 rounded-xl mb-6 transition flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> افزودن مقاله
                        </button>
                        <DataTable
                            data={data.blogs}
                            columns={[
                                { key: 'title', label: 'عنوان' },
                                { key: 'category', label: 'دسته‌بندی' },
                                { key: 'date', label: 'تاریخ' },
                            ]}
                            onEdit={(item) => openEditModal('ویرایش مقاله', item)}
                            onDelete={(id) => handleDelete(id, 'blog')}
                        />
                    </div>
                );
            case 'consultations':
                return (
                    <DataTable
                        data={data.consultations}
                        columns={[
                            { key: 'name', label: 'نام' },
                            { key: 'phone', label: 'تلفن' },
                            { key: 'subject', label: 'موضوع' },
                            { key: 'date', label: 'تاریخ' },
                            {
                                key: 'status', label: 'وضعیت', render: (item: Consultation) => (
                                    <span className={`px-2 py-0.5 rounded text-xs ${item.status === 'new' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                        {item.status === 'new' ? 'جدید' : 'خوانده شده'}
                                    </span>
                                )
                            },
                        ]}
                        onEdit={() => { }}
                        onDelete={(id) => handleDelete(id, 'consultations')}
                        onMarkRead={(id) => handleMarkRead(id)}
                    />
                );
            case 'admins':
                return (
                    <div>
                        <button
                            onClick={() => openAddModal('افزودن ادمین جدید', { role: 'content', permissions: [] })}
                            className="bg-gold hover:bg-gold-dark text-black font-bold px-6 py-2 rounded-xl mb-6 transition flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> افزودن ادمین
                        </button>
                        <DataTable
                            data={data.admins}
                            columns={[
                                { key: 'fullName', label: 'نام کامل' },
                                { key: 'username', label: 'نام کاربری' },
                                { key: 'role', label: 'نقش', render: (item: Admin) => item.role === 'full' ? 'کامل' : 'محتوا' },
                            ]}
                            onEdit={(item) => openEditModal('ویرایش ادمین', item)}
                            onDelete={(id) => handleDelete(id, 'admins')}
                        />
                    </div>
                );
            case 'settings':
                return (
                    <div className="space-y-4">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h4 className="text-gold font-bold mb-4">تنظیمات سایت</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="input-label">برند (انگلیسی)</label>
                                    <input
                                        type="text"
                                        value={data.settings.brand}
                                        onChange={(e) => setData({ ...data, settings: { ...data.settings, brand: e.target.value } })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="input-label">زیر برند</label>
                                    <input
                                        type="text"
                                        value={data.settings.subBrand}
                                        onChange={(e) => setData({ ...data, settings: { ...data.settings, subBrand: e.target.value } })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="input-label">تلفن</label>
                                    <input
                                        type="text"
                                        value={data.settings.phone}
                                        onChange={(e) => setData({ ...data, settings: { ...data.settings, phone: e.target.value } })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="input-label">ایمیل</label>
                                    <input
                                        type="email"
                                        value={data.settings.email}
                                        onChange={(e) => setData({ ...data, settings: { ...data.settings, email: e.target.value } })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="input-label">آدرس</label>
                                    <input
                                        type="text"
                                        value={data.settings.address}
                                        onChange={(e) => setData({ ...data, settings: { ...data.settings, address: e.target.value } })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="input-label">فوتر</label>
                                    <input
                                        type="text"
                                        value={data.settings.footer}
                                        onChange={(e) => setData({ ...data, settings: { ...data.settings, footer: e.target.value } })}
                                        className="input-field"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => handleSave()}
                                    className="bg-gold hover:bg-gold-dark text-black font-bold px-6 py-2 rounded-xl transition flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> ذخیره تنظیمات
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>محتوای {activeTab}</div>;
        }
    };

    // رندر فرم مودال بر اساس نوع تب
    const renderModalForm = () => {
        if (!modal) return null;
        const isEdit = modal.type === 'edit';

        const renderFields = () => {
            switch (activeTab) {
                case 'slides':
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="input-label">عنوان *</label>
                                <input type="text" className="input-field" placeholder="مثلاً: آرتام سازه" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="input-label">زیرعنوان (Kicker)</label>
                                <input type="text" className="input-field" placeholder="مثلاً: گروه توسعه و ساختمان" value={formData.kicker || ''} onChange={e => setFormData({ ...formData, kicker: e.target.value })} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="input-label">توضیحات</label>
                                <textarea rows={3} className="textarea-field" placeholder="توضیح کوتاه اسلاید..." value={formData.desc || ''} onChange={e => setFormData({ ...formData, desc: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">مدیر پروژه</label>
                                <input type="text" className="input-field" placeholder="نام مدیر" value={formData.manager || ''} onChange={e => setFormData({ ...formData, manager: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">آدرس تصویر</label>
                                <input type="text" className="input-field" placeholder="/images/slide/1.jpg" value={formData.image || ''} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">متن دکمه ۱</label>
                                <input type="text" className="input-field" placeholder="مشاهده پروژه‌ها" value={formData.btn1Text || ''} onChange={e => setFormData({ ...formData, btn1Text: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">لینک دکمه ۱</label>
                                <input type="text" className="input-field" placeholder="#projects" value={formData.btn1Link || ''} onChange={e => setFormData({ ...formData, btn1Link: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">متن دکمه ۲</label>
                                <input type="text" className="input-field" placeholder="درخواست مشاوره" value={formData.btn2Text || ''} onChange={e => setFormData({ ...formData, btn2Text: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">لینک دکمه ۲</label>
                                <input type="text" className="input-field" placeholder="#contact" value={formData.btn2Link || ''} onChange={e => setFormData({ ...formData, btn2Link: e.target.value })} />
                            </div>
                            <div className="md:col-span-2 flex items-center gap-3 p-3 rounded-xl bg-gold/5 border border-gold/10">
                                <input
                                    type="checkbox"
                                    checked={formData.active !== false}
                                    onChange={e => setFormData({ ...formData, active: e.target.checked })}
                                    className="w-4 h-4 accent-gold"
                                />
                                <label className="text-sm font-medium text-gold cursor-pointer">فعال باشد</label>
                            </div>
                        </div>
                    );

                case 'projects':
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="input-label">نام پروژه *</label>
                                <input type="text" className="input-field" placeholder="مثلاً: آرتام نیاوران" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">موقعیت *</label>
                                <input type="text" className="input-field" placeholder="مثلاً: نیاوران" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">وضعیت</label>
                                <select className="input-field" value={formData.status || 'در حال ساخت'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option>در حال ساخت</option>
                                    <option>تحویل شده</option>
                                    <option>آغاز به کار</option>
                                </select>
                            </div>
                            <div>
                                <label className="input-label">درصد پیشرفت</label>
                                <input type="number" min="0" max="100" className="input-field" placeholder="۰ تا ۱۰۰" value={formData.progress || 0} onChange={e => setFormData({ ...formData, progress: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="input-label">آدرس تصویر</label>
                                <input type="text" className="input-field" placeholder="/images/projects/1.jpg" value={formData.image || ''} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="input-label">توضیحات</label>
                                <textarea rows={3} className="textarea-field" placeholder="توضیحاتی درباره پروژه..." value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                        </div>
                    );

                case 'services':
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="input-label">عنوان خدمت *</label>
                                <input type="text" className="input-field" placeholder="مثلاً: مشارکت در ساخت" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">آیکون</label>
                                <input type="text" className="input-field" placeholder="bi-buildings" value={formData.icon || ''} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="input-label">توضیحات</label>
                                <textarea rows={3} className="textarea-field" placeholder="توضیح کوتاه خدمت..." value={formData.desc || ''} onChange={e => setFormData({ ...formData, desc: e.target.value })} />
                            </div>
                        </div>
                    );

                case 'testimonials':
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="input-label">نام *</label>
                                <input type="text" className="input-field" placeholder="نام و نام خانوادگی" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">عنوان شغلی</label>
                                <input type="text" className="input-field" placeholder="مثلاً: سرمایه‌گذار" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="input-label">متن نظر *</label>
                                <textarea rows={4} className="textarea-field" placeholder="نظر مشتری..." value={formData.text || ''} onChange={e => setFormData({ ...formData, text: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">وضعیت</label>
                                <select className="input-field" value={formData.status || 'pending'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="pending">در انتظار</option>
                                    <option value="approved">تأیید شده</option>
                                    <option value="rejected">رد شده</option>
                                </select>
                            </div>
                            <div>
                                <label className="input-label">امتیاز (۱ تا ۵)</label>
                                <input type="number" min="1" max="5" className="input-field" placeholder="۵" value={formData.rating || 5} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })} />
                            </div>
                        </div>
                    );

                case 'blog':
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="input-label">عنوان مقاله *</label>
                                <input type="text" className="input-field" placeholder="عنوان مقاله..." value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">دسته‌بندی</label>
                                <input type="text" className="input-field" placeholder="مثلاً: اخبار ساختمان" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">تاریخ</label>
                                <input type="text" className="input-field" placeholder="۱۴۰۵/۰۵/۲۸" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="input-label">محتوای مقاله</label>
                                <textarea rows={6} className="textarea-field" placeholder="محتوای کامل مقاله..." value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                            </div>
                        </div>
                    );

                case 'admins':
                    const isFullAdmin = formData.role === 'full';

                    const togglePermission = (permKey: string) => {
                        const current = formData.permissions || [];
                        if (current.includes(permKey)) {
                            setFormData({ ...formData, permissions: current.filter(p => p !== permKey) });
                        } else {
                            setFormData({ ...formData, permissions: [...current, permKey] });
                        }
                    };

                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="input-label">نام کامل *</label>
                                <input type="text" className="input-field" placeholder="نام و نام خانوادگی" value={formData.fullName || ''} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">نام کاربری *</label>
                                <input type="text" className="input-field" placeholder="username" value={formData.username || ''} onChange={e => setFormData({ ...formData, username: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">رمز عبور {!isEdit && '*'}</label>
                                <input type="password" className="input-field" placeholder="••••••••" value={formData.password || ''} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                            </div>
                            <div>
                                <label className="input-label">نقش</label>
                                <select className="input-field" value={formData.role || 'content'} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                                    <option value="content">مدیر محتوا</option>
                                    <option value="full">مدیر کامل</option>
                                </select>
                            </div>
                            <div>
                                <label className="input-label">شماره تماس</label>
                                <input type="text" className="input-field" placeholder="۰۹۱۲..." value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            </div>

                            {/* بخش شرطی مدیریت دسترسی‌ها */}
                            <div className="md:col-span-2">
                                {isFullAdmin ? (
                                    <div className="p-4 rounded-xl bg-gold/5 border border-gold/20 text-center">
                                        <p className="text-sm font-bold text-gold">مدیر کامل به تمام بخش‌ها دسترسی دارد.</p>
                                        <p className="text-xs text-muted-foreground mt-1">برای محدود کردن دسترسی‌ها، نقش را به "مدیر محتوا" تغییر دهید.</p>
                                    </div>
                                ) : (
                                    <>
                                        <label className="input-label">دسترسی بخش‌ها (برای مدیر محتوا)</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-xl bg-background/40 border border-border/50">
                                            {ALL_PERMISSIONS.map(perm => {
                                                const isChecked = (formData.permissions || []).includes(perm.key);
                                                return (
                                                    <div
                                                        key={perm.key}
                                                        className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/30 hover:border-gold/30 transition-all duration-200"
                                                    >
                                                        <span className="text-xs font-medium text-foreground">{perm.label}</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={isChecked}
                                                                onChange={() => togglePermission(perm.key)}
                                                            />
                                                            <div className="w-11 h-6 bg-muted-foreground/20 rounded-full peer-checked:bg-gold transition-all duration-300 relative"></div>
                                                            <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full shadow transition-all duration-300 peer-checked:translate-x-[-20px] peer-checked:border-gold peer-checked:bg-black"></div>
                                                            <span className={`ms-2 text-[10px] font-bold ${isChecked ? 'text-gold' : 'text-muted-foreground'}`}>
                                                                {isChecked ? 'ON' : 'OFF'}
                                                            </span>
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mt-2">با فعال کردن هر بخش، ادمین به آن بخش دسترسی خواهد داشت.</p>
                                    </>
                                )}
                            </div>
                        </div>
                    );

                default:
                    return null;
            }
        };

        return (
            <Modal
                isOpen={!!modal}
                onClose={() => setModal(null)}
                title={modal.title}
                onSubmit={handleModalSubmit}
                submitLabel="ذخیره تغییرات"
            >
                {renderFields()}
            </Modal>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="font-serif text-sm text-gold">ARTAM SAZEH</span>
                        <span className="hidden sm:inline text-xs text-muted-foreground border-r border-border pr-3 mr-3">پنل مدیریت</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:inline">{user?.fullName}</span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition"
                        >
                            <LogOut className="w-4 h-4" />
                            خروج
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-col md:flex-row">
                <aside className="md:w-52 bg-card/50 border-l border-border p-3 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition mb-1 ${activeTab === tab.id
                                    ? 'bg-gold/10 text-gold font-bold border border-gold/20'
                                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground border border-transparent'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </aside>

                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {message && (
                        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-xl mb-4 text-sm flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            {message}
                        </div>
                    )}
                    {renderContent()}
                </main>
            </div>

            {renderModalForm()}
        </div>
    );
}