import React, { useState } from 'react';
import {
  Zap,
  X,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Code,
  RefreshCw,
  Sparkles,
  Layers,
  Filter,
} from 'lucide-react';

interface AutomationEvent {
  id: string;
  eventType: 'booking.created' | 'lead.qualified' | 'inventory.alert' | 'webhook.dispatched';
  title: string;
  leadScore?: number;
  leadTier?: 'High' | 'Medium' | 'Low';
  payload: Record<string, any>;
  timestamp: string;
  status: '200 OK' | 'Pending' | 'Queued';
}

interface AutomationLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AutomationLogsModal: React.FC<AutomationLogsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<AutomationEvent | null>(null);
  const [events, setEvents] = useState<AutomationEvent[]>([
    {
      id: 'evt-101',
      eventType: 'lead.qualified',
      title: 'AI Lead Qualification: High Value Lead',
      leadScore: 94,
      leadTier: 'High',
      timestamp: '2 mins ago',
      status: '200 OK',
      payload: {
        customer: 'Sarah Connor',
        email: 'sarah.c@example.com',
        vehicleRequested: 'Range Rover Sport',
        rentalDays: 7,
        estimatedRevenue: 1478.0,
        aiScoreReason: 'Long term luxury rental request with verified identity.',
      },
    },
    {
      id: 'evt-102',
      eventType: 'booking.created',
      title: 'Automated Booking Sync -> CRM Webhook',
      leadScore: 88,
      leadTier: 'High',
      timestamp: '14 mins ago',
      status: '200 OK',
      payload: {
        bookingId: 'BK-2026-894',
        vehicleId: 'car-3',
        vehicleName: 'Toyota Corolla',
        paymentMethod: 'PayU',
        totalPaid: 1569.0,
        webhookUrl: 'https://api.bestcar.com/webhooks/booking-sync',
      },
    },
    {
      id: 'evt-103',
      eventType: 'inventory.alert',
      title: 'Low Stock Automation Triggered',
      leadScore: 65,
      leadTier: 'Medium',
      timestamp: '45 mins ago',
      status: '200 OK',
      payload: {
        category: 'SUV / Luxury',
        availableCount: 2,
        threshold: 3,
        autoRestockOrder: 'TRIGGERED_SUPPLIER_API',
      },
    },
  ]);

  if (!isOpen) return null;

  const handleTriggerTestWebhook = () => {
    const newEvt: AutomationEvent = {
      id: `evt-${Math.floor(100 + Math.random() * 900)}`,
      eventType: 'webhook.dispatched',
      title: 'Test Webhook Payload Dispatched',
      leadScore: Math.floor(70 + Math.random() * 28),
      leadTier: 'High',
      timestamp: 'Just now',
      status: '200 OK',
      payload: {
        event: 'test.webhook_ping',
        triggeredBy: 'Super Admin',
        environment: 'production',
        latencyMs: 142,
      },
    };
    setEvents([newEvt, ...events]);
    setSelectedEvent(newEvt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base md:text-lg leading-tight flex items-center gap-2">
                AI Automations & Webhook Logs
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/30">
                  Active Workflow
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Real-time automated lead scoring, CRM webhooks & inventory alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerTestWebhook}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Trigger Test Webhook</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50">
          {/* Events List */}
          <div className="md:col-span-7 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Automated Event Stream ({events.length})
            </h3>

            {events.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer shadow-2xs ${
                  selectedEvent?.id === evt.id
                    ? 'border-orange-500 ring-2 ring-orange-500/10'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold rounded-lg">
                    {evt.eventType}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {evt.timestamp}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 mb-2">{evt.title}</h4>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span className="font-semibold text-slate-700">
                      Lead Score: {evt.leadScore}/100
                    </span>
                  </div>

                  <span className="flex items-center gap-1 font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {evt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Payload Inspector */}
          <div className="md:col-span-5 flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" />
              Payload Inspector
            </h3>

            <div className="flex-1 bg-slate-900 rounded-2xl p-4 text-slate-200 font-mono text-xs overflow-y-auto border border-slate-800 shadow-inner min-h-[300px]">
              {selectedEvent ? (
                <div>
                  <div className="text-emerald-400 font-bold mb-2 pb-2 border-b border-slate-800 flex items-center justify-between">
                    <span>// {selectedEvent.id}</span>
                    <span className="text-xs font-normal text-slate-400">JSON Payload</span>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
                    {JSON.stringify(selectedEvent.payload, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center py-12">
                  <Code className="w-8 h-8 mb-2 stroke-1" />
                  <p className="text-xs">Click any event on the left to inspect its JSON webhook payload.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
