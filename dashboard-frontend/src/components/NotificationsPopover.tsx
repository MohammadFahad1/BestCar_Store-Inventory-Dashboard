import React, { useState, useEffect } from 'react';
import { X, Bell, Mail, CheckCheck, Car, AlertTriangle, CreditCard, Sparkles } from 'lucide-react';
import { dashboardApi, WebhookLogItem } from '../services/api';
import { Transaction } from '../types';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: any;
  color: string;
  unread: boolean;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
  onUnreadCountChange,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen) return;

    const fetchDynamicNotifications = async () => {
      try {
        const [webhooks, transactions] = await Promise.all([
          dashboardApi.getWebhookLogs(),
          dashboardApi.getRecentTransactions(),
        ]);

        const items: NotificationItem[] = [];

        // 1. Transform Webhook logs into dynamic notifications
        webhooks.forEach((w: WebhookLogItem) => {
          let IconComp = Sparkles;
          let colorStyle = 'text-blue-600 bg-blue-50';

          if (w.eventType === 'booking.created') {
            IconComp = CreditCard;
            colorStyle = 'text-emerald-600 bg-emerald-50';
          } else if (w.eventType === 'lead.qualified') {
            IconComp = Car;
            colorStyle = 'text-[#f97316] bg-orange-50';
          } else if (w.eventType === 'inventory.alert') {
            IconComp = AlertTriangle;
            colorStyle = 'text-amber-600 bg-amber-50';
          }

          items.push({
            id: `wh-${w.id}`,
            title: w.title,
            desc: w.leadTier ? `Lead Tier: ${w.leadTier} (Score: ${w.leadScore || 85}/100)` : `Event: ${w.eventType} [${w.status}]`,
            time: w.timestamp || 'Just now',
            icon: IconComp,
            color: colorStyle,
            unread: !readIds.has(`wh-${w.id}`),
          });
        });

        // 2. Transform Transactions into dynamic notifications
        transactions.forEach((t: Transaction) => {
          items.push({
            id: `tx-${t.id}`,
            title: `Payment ${t.status}: ${t.carName}`,
            desc: `$${t.amount.toLocaleString()} processed via ${t.paymentMethod} (${t.transactionCode})`,
            time: t.timeAgo || 'Recent',
            icon: CreditCard,
            color: t.status === 'Success' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50',
            unread: !readIds.has(`tx-${t.id}`),
          });
        });

        // Fallback default notifications if database lists are empty
        if (items.length === 0) {
          items.push(
            {
              id: 'def-1',
              title: 'New Rental Booking Received',
              desc: 'Range Rover Sport booked via Website Customer Portal ($780.00)',
              time: '12 mins ago',
              icon: CreditCard,
              color: 'text-emerald-600 bg-emerald-50',
              unread: !readIds.has('def-1'),
            },
            {
              id: 'def-2',
              title: 'AI Lead Qualification Alert',
              desc: 'High-intent lead score (92/100) identified for Tesla Model 3',
              time: '45 mins ago',
              icon: Sparkles,
              color: 'text-[#f97316] bg-orange-50',
              unread: !readIds.has('def-2'),
            }
          );
        }

        const sliced = items.slice(0, 8);
        setNotifications(sliced);
        const count = sliced.filter((n) => n.unread).length;
        if (onUnreadCountChange) onUnreadCountChange(count);
      } catch (err) {
        console.error('Error loading dynamic notifications:', err);
      }
    };

    fetchDynamicNotifications();
  }, [isOpen, readIds]);

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    const allIds = new Set(notifications.map((n) => n.id));
    setReadIds(allIds);
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    if (onUnreadCountChange) onUnreadCountChange(0);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-slate-900/30 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#f97316]" />
            <h3 className="text-sm font-bold text-slate-900">Notifications &amp; Activity Log</h3>
            {unreadCount > 0 && (
              <span className="bg-[#f97316] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
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
                onClick={() => {
                  const updatedReadIds = new Set(readIds).add(n.id);
                  setReadIds(updatedReadIds);
                  const updated = notifications.map((item) =>
                    item.id === n.id ? { ...item, unread: false } : item
                  );
                  setNotifications(updated);
                  const remaining = updated.filter((item) => item.unread).length;
                  if (onUnreadCountChange) onUnreadCountChange(remaining);
                }}
                className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                  n.unread ? 'bg-orange-50/30' : ''
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${n.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
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
            onClick={handleMarkAllRead}
            className="text-xs font-semibold text-[#f97316] hover:text-[#ea580c] flex items-center justify-center gap-1 w-full cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>
    </div>
  );
};
