'use client';

import { useState, useEffect, ReactNode } from 'react';

const SESSION_KEY = 'admin_password';

export function getStoredPassword(): string {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem(SESSION_KEY) ?? '';
}

async function verifyPassword(password: string): Promise<boolean> {
  try {
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify', password }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIsAdmin(!!sessionStorage.getItem(SESSION_KEY));
    setReady(true);
  }, []);

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }

  return { isAdmin, ready, setIsAdmin, logout };
}

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) setAuthed(true);
    setChecking(false);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await verifyPassword(password);
    if (ok) {
      sessionStorage.setItem(SESSION_KEY, password);
      setAuthed(true);
    } else {
      setError('Senha incorreta / パスワードが違います');
    }
    setLoading(false);
  }

  if (checking) return null;
  if (authed) return <>{children}</>;

  return (
    <div className="page-enter min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Área Restrita</h2>
          <p className="text-slate-400 text-sm">管理者パスワードを入力してください</p>
        </div>

        <div className="space-y-2">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Senha / パスワード"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-600 transition-colors"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? '...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
