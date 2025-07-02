import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotificationBell() {
    // 1. حالة لتتبع إذا كانت قائمة الإشعارات مفتوحة أم لا
    const [open, setOpen] = useState(false);
    // 2. حالة لتخزين الإشعارات التي نأتي بها من السيرفر
    const [notifications, setNotifications] = useState([]);

    // 3. تحميل الإشعارات مرة واحدة عندما يفتح المكون (Component)
    useEffect(() => {
        fetch('/notifications')
            .then((res) => res.json())
            .then((data) => setNotifications(data)) // نخزن البيانات في الحالة
            .catch(() => setNotifications([])); // في حالة خطأ نترك الإشعارات فارغة
    }, []);

    const handleMarkAsRead = (id) => {
        fetch(`/notifications/${id}/mark-as-read`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                                // إضافة CSRF token للحماية من الهجمات
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        }).then(() => {
            setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read_at: new Date().toISOString() } : item)));
        });
    };

    // Alleen ongelezen notificaties tellen read_at == null
    const unread = notifications.filter((n) => !n.read_at);

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="relative">
                <Bell className="h-6 w-6 text-gray-700" />
                {unread.length > 0 && (
                    <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1 text-xs text-white">{unread.length}</span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 max-h-96 w-80 overflow-auto rounded border bg-white shadow-lg">
                    <ul>
                        {notifications.map((n) => (
                            <li
                                key={n.id}
                                onClick={() => handleMarkAsRead(n.id)}
                                className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                                    n.read_at ? 'bg-gray-100' : 'bg-red-100'
                                } hover:bg-gray-200`}
                            >
                                <div className={`${n.read_at ? 'text-black' : 'font-semibold text-red-700'}`}>
                                    {n.data.message || 'Order status gewijzigd'}
                                </div>
                                <div className="text-xs text-gray-500">{new Date(n.created_at).toLocaleString()}</div>
                            </li>
                        ))}
                        {notifications.length === 0 && <li className="px-4 py-2 text-sm text-gray-500">Geen meldingen</li>}
                    </ul>
                </div>
            )}
        </div>
    );
}
