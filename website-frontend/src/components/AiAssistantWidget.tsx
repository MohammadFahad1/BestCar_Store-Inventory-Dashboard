import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  ChevronRight,
} from 'lucide-react';
import { Car } from '../types';
import { websiteApi } from '../services/api';

interface AiAssistantWidgetProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedCarIds?: string[];
  timestamp: string;
}

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({
  cars,
  onSelectCar,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hi! 👋 I'm your BestCar AI Concierge. What kind of trip or vehicle are you looking for today?",
      timestamp: 'Just now',
    },
  ]);

  const quickPrompts = [
    { label: '🚙 Family Trip (7-Seater)', query: 'family' },
    { label: '⚡ Luxury & Premium', query: 'luxury' },
    { label: '💰 Budget Deals (< $100)', query: 'budget' },
    { label: '🏔️ Long Range / Electric', query: 'electric' },
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsgId = crypto.randomUUID();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: textToSend,
        timestamp: now,
      },
    ];

    setMessages(newMessages);
    if (!queryText) setInputText('');

    // Query Backend DRF AI Concierge API
    websiteApi.queryAiConcierge(textToSend).then((res) => {
      let matchedCars = res.vehicles;
      let aiText = res.text;

      if (!aiText || matchedCars.length === 0) {
        const lower = textToSend.toLowerCase();
        if (lower.includes('family') || lower.includes('7') || lower.includes('space') || lower.includes('suv')) {
          matchedCars = cars.filter((c) => c.type === 'SUV' || c.seats >= 5).slice(0, 2);
          aiText = "Great! Here are our top spacious SUV options perfect for family trips & luggage:";
        } else if (lower.includes('luxury') || lower.includes('premium') || lower.includes('sport')) {
          matchedCars = cars.filter((c) => c.type === 'Luxury' || c.pricePerDay >= 120).slice(0, 2);
          aiText = "Here are our premium luxury models with top-tier performance & luxury features:";
        } else if (lower.includes('budget') || lower.includes('cheap') || lower.includes('100')) {
          matchedCars = cars.filter((c) => c.pricePerDay <= 95).slice(0, 2);
          aiText = "Here are our best budget-friendly rental options under $100/day:";
        } else {
          matchedCars = [cars[0], cars[1]].filter(Boolean);
          aiText = `Based on your request "${textToSend}", I highly recommend checking out these featured rentals:`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: 'ai',
          text: aiText,
          recommendedCarIds: matchedCars.map((c) => c.id),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />
            </div>
            <span className="font-bold text-xs tracking-wide uppercase">AI Concierge</span>
          </button>
        )}
      </div>

      {/* Expanded Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[520px] animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-neutral-900 to-slate-900 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  BestCar AI Concierge
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/30">
                    Live AI
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300 font-medium">Smart Vehicle Matcher & Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              const recommendedCars = cars.filter((c) => msg.recommendedCarIds?.includes(c.id));

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm shadow-2xs leading-relaxed ${
                      isAi
                        ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-xs'
                        : 'bg-orange-500 text-white font-medium rounded-tr-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1 ${
                        isAi ? 'text-slate-400' : 'text-orange-100'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Recommendation Cards */}
                  {recommendedCars.length > 0 && (
                    <div className="mt-2.5 space-y-2 w-full max-w-[92%]">
                      {recommendedCars.map((car) => (
                        <div
                          key={car.id}
                          className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 hover:border-orange-300 transition-all"
                        >
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-16 h-12 object-cover rounded-xl border border-slate-100"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-slate-900 truncate">
                              {car.name}
                            </h4>
                            <p className="text-[11px] font-semibold text-orange-500">
                              ${car.pricePerDay}
                              <span className="text-[10px] text-slate-400 font-normal">/day</span>
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              onSelectCar(car);
                              setIsOpen(false);
                            }}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-orange-500 text-white text-[11px] font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                          >
                            <span>Book</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Action Chips */}
          <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            {quickPrompts.map((p) => (
              <button
                key={p.query}
                onClick={() => handleSend(p.label)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-700 text-[11px] font-semibold rounded-full shrink-0 transition-colors cursor-pointer border border-slate-200/60"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI for vehicle recommendations..."
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500 focus:bg-white transition-all text-slate-800"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
