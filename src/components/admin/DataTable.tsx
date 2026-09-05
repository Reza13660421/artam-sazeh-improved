'use client';

import { Pencil, Trash2, Check, X } from 'lucide-react';

interface Column {
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
    data: any[];
    columns: Column[];
    onEdit: (item: any) => void;
    onDelete: (id: number) => void;
    onApprove?: (id: number) => void;
    onReject?: (id: number) => void;
    onMarkRead?: (id: number) => void;
}

export default function DataTable({
    data,
    columns,
    onEdit,
    onDelete,
    onApprove,
    onReject,
    onMarkRead,
}: DataTableProps) {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-background/50 border-b border-border">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="p-3 text-right">
                                {col.label}
                            </th>
                        ))}
                        <th className="p-3 text-right">عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="border-b border-border/50 hover:bg-background/30">
                            {columns.map((col) => (
                                <td key={col.key} className="p-3">
                                    {col.render ? col.render(item) : item[col.key]}
                                </td>
                            ))}
                            <td className="p-3 flex gap-2 flex-wrap">
                                <button onClick={() => onEdit(item)} className="text-gold hover:bg-gold/10 p-1.5 rounded transition">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                {onApprove && (
                                    <button onClick={() => onApprove(item.id)} className="text-green-400 hover:bg-green-500/10 p-1.5 rounded transition">
                                        <Check className="w-4 h-4" />
                                    </button>
                                )}
                                {onReject && (
                                    <button onClick={() => onReject(item.id)} className="text-red-400 hover:bg-red-500/10 p-1.5 rounded transition">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                {onMarkRead && (
                                    <button onClick={() => onMarkRead(item.id)} className="text-blue-400 hover:bg-blue-500/10 p-1.5 rounded transition">
                                        <Check className="w-4 h-4" />
                                    </button>
                                )}
                                <button onClick={() => onDelete(item.id)} className="text-red-400 hover:bg-red-500/10 p-1.5 rounded transition">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1} className="p-6 text-center text-muted-foreground">
                                هیچ داده‌ای یافت نشد
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
