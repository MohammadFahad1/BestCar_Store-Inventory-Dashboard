import React from 'react';
import { X, Bell, Mail, CheckCheck, Car, AlertTriangle, CreditCard } from 'lucide-react';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'New High-Value Sale!',
      desc: 'Range Rover sold for $1,099.00 via Paypal',
      time: '15 mins ago',
      icon: CreditCard,
      color: 'text-emerald-600 bg-emerald-50',
      unread: true,
    },
    {
      id: 2,
      title: 'Customer Inquiry Received',
      desc: 'Message from Alex regarding Audi S3 test drive availability',
      time: '1 hour ago',
      icon: Mail,
      color: 'text-blue-600 bg-blue-50',
      unread: true,
    },
    {
      id: 3,
      title: 'Low Stock Alert',
      desc: 'Compact car inventory is below threshold (3 remaining)',
      time: '3 hours ago',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50',
      unread: false,
    },
    {
      id: 4,
      title: 'Weekly Earning Goal Reached',
      desc: 'Store crossed $95,000 weekly earnings milestone (+48%)',
      time: '5 hours ago',
      icon: Car,
      color: 'text-[#f97316] bg-orange-50',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-slate-900/30 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#f97316]" />
            <h3 className="text-sm font-bold text-slate-900">Notifications &amp; Messages</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                  n.unread ? 'bg-orange-50/20' : ''
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${n.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 truncate">{n.title}</p>
                    <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-tight">{n.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#f97316] hover:text-[#ea580c] flex items-center justify-center gap-1 w-full"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>
    </div>
  );
};
