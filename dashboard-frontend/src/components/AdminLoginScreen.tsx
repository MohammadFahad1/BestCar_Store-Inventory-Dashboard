import React, { useState } from 'react';
import { Lock, Mail, Key, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface AdminLoginScreenProps {
  onLoginSuccess: (token: string, user: { name: string; email: string }) => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@bestcar.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Attempt JWT token authentication with Django backend
      const res = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        onLoginSuccess(data.access, { name: 'Super Admin', email });
      } else {
        // Fallback demo authentication for development
        if ((email === 'admin@bestcar.com' || email === 'admin') && password === 'admin123') {
          onLoginSuccess('demo-jwt-token-xyz-123', { name: 'Super Admin', email: 'admin@bestcar.com' });
        } else {
          setErrorMsg('Invalid admin credentials. Use admin@bestcar.com / admin123');
        }
      }
    } catch (err) {
      // Fallback demo login
      if ((email === 'admin@bestcar.com' || email === 'admin') && password === 'admin123') {
        onLoginSuccess('demo-jwt-token-xyz-123', { name: 'Super Admin', email: 'admin@bestcar.com' });
      } else {
        setErrorMsg('Authentication error. Try demo credentials: admin@bestcar.com / admin123');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f97316]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f97316] to-amber-500 text-white shadow-lg shadow-orange-500/25 mb-2">
            <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            BestCar Admin Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Enter your credentials to access store analytics & inventory
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@bestcar.com"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#f97316] to-amber-500 hover:from-[#ea580c] hover:to-amber-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-300">Demo Admin Credentials:</span>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-2.5 border border-slate-800/60 font-mono text-[11px] text-slate-400 flex items-center justify-around">
            <span>User: <strong className="text-white">admin@bestcar.com</strong></span>
            <span>Pass: <strong className="text-white">admin123</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
