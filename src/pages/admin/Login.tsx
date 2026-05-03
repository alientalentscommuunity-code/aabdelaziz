import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'Ahmad2024!';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hardcoded admin authentication
    if (email === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_user', ADMIN_USER);
      setIsAuthenticated(true);
    } else {
      setError('Invalid username or password');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2">
            Admin Access
          </h1>
          <p className="text-white/40 text-sm font-medium italic">
            Sign in to manage incoming requests
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="glass p-6 md:p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-white">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white focus:ring-green-500/20"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-widest text-white">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white focus:ring-green-500/20"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-green-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </span>
            )}
          </Button>

          <p className="text-center text-xs text-white/20">
            Protected area. Authorized access only.
          </p>
        </form>
      </div>
    </div>
  );
}
