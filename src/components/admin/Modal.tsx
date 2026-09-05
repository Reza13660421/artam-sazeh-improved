'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSubmit?: () => void;
    submitLabel?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    onSubmit,
    submitLabel = 'ذخیره',
    size = 'md',
}: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            {/* بک‌دراپ */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
                onClick={onClose}
            />

            {/* کادر مودال */}
            <div
                className={cn(
                    'relative w-full bg-card border border-gold/20 rounded-2xl shadow-2xl shadow-black/50',
                    'animate-[slideUp_0.3s_ease-out]',
                    sizeClasses[size]
                )}
            >
                {/* هدر */}
                <div className="relative flex items-center justify-between px-6 py-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                            <span className="text-gold">✨</span>
                        </div>
                        <h3 className="font-bold text-foreground text-lg">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* بدنه */}
                <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>

                {/* فوتر */}
                {onSubmit && (
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-border/50 bg-background/50 rounded-b-2xl">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-muted/50 transition-colors font-medium"
                        >
                            انصراف
                        </button>
                        <button
                            onClick={onSubmit}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-l from-gold to-gold-dark text-black font-bold hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.02] transition-all duration-200"
                        >
                            {submitLabel}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}