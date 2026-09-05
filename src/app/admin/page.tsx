'use client';

import { AuthProvider } from '@/components/admin/AuthContext';
import LoginForm from '@/components/admin/LoginForm';
import Dashboard from '@/components/admin/Dashboard';
import { useAuth } from '@/components/admin/AuthContext';

function AdminContent() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gold text-xl">در حال بارگذاری...</div>
            </div>
        );
    }

    if (!isAuthenticated) return <LoginForm />;
    return <Dashboard />;
}

export default function AdminPage() {
    return (
        <AuthProvider>
            <AdminContent />
        </AuthProvider>
    );
}