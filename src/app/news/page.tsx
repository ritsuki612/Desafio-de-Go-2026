'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminAuth, getStoredPassword } from '@/components/PasswordGate';

interface NewsPost {
  id: string;
  title: string;
  content: string;
  photos: string[];
  publishedAt: string;
}

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function toDriveProxyUrl(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (u.hostname === 'drive.google.com') {
      const id = u.searchParams.get('id');
      if (id) return `/api/drive-image?id=${id}`;
    }
  } catch {
    // 解析失敗時はそのまま返す
  }
  return url;
}

function PhotoGrid({ photos }: { photos: string[] }) {
  photos = photos.map(toDriveProxyUrl);
  if (photos.length === 0) return null;
  if (photos.length === 1) {
    return (
      <div className="rounded-2xl overflow-hidden h-72">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[0]} alt="News photo" className="w-full h-full object-cover" />
      </div>
    );
  }
  if (photos.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {photos.map((p, i) => (
          <div key={i} className="h-60 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="row-span-2 overflow-hidden rounded-xl min-h-[240px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[0]} alt="Photo 1" className="w-full h-full object-cover" />
      </div>
      <div className="overflow-hidden rounded-xl h-[116px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[1]} alt="Photo 2" className="w-full h-full object-cover" />
      </div>
      <div className="overflow-hidden rounded-xl h-[116px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[2]} alt="Photo 3" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

function NewsCard({
  post,
  lang,
  isAdmin,
  onDelete,
  deleting,
}: {
  post: NewsPost;
  lang: string;
  isAdmin: boolean;
  onDelete: (id: string) => void;
  deleting: boolean;
}) {
  const { t } = useLanguage();
  const nt = t.news;
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <article className="glass-card rounded-3xl overflow-hidden">
      {post.photos.length > 0 && (
        <div className="p-4 pb-0">
          <PhotoGrid photos={post.photos} />
        </div>
      )}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {nt.publishedOn} {formatDate(post.publishedAt, lang)}
          </p>
          {isAdmin && (
            <div className="flex gap-2 items-center">
              {confirmDelete && (
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-slate-700 transition-colors"
                >
                  {nt.cancel}
                </button>
              )}
              <button
                onClick={() => confirmDelete ? onDelete(post.id) : setConfirmDelete(true)}
                disabled={deleting}
                className={`text-xs px-3 py-1 rounded-lg transition-colors disabled:opacity-50 ${
                  confirmDelete
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'text-slate-500 hover:text-red-400 bg-slate-800 hover:bg-slate-700'
                }`}
              >
                {deleting ? '...' : confirmDelete ? nt.deleteConfirm : nt.deletePost}
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-white leading-snug">{post.title}</h2>
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>
    </article>
  );
}

// パスワード認証モーダル
function AuthModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', password }),
      });
      if (res.ok) {
        sessionStorage.setItem('admin_password', password);
        onSuccess();
      } else {
        setError('Senha incorreta / パスワードが違います');
      }
    } catch {
      setError('Erro de conexão');
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
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
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={loading || !password}
            className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {loading ? '...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewsPage() {
  const { language, t } = useLanguage();
  const nt = t.news;
  const { isAdmin, ready, setIsAdmin, logout } = useAdminAuth();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  async function fetchPosts() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPosts(); }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete-news', id, password: getStoredPassword() }),
      });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  if (!ready) return null;

  return (
    <div className="page-enter">
      {showAuthModal && (
        <AuthModal
          onSuccess={() => { setIsAdmin(true); setShowAuthModal(false); }}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* ヒーロー */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-5 py-2 text-green-400 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Desafio de Go 2026
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white">{nt.title}</h1>
          <p className="text-slate-400 text-lg">{nt.subtitle}</p>
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            {isAdmin ? (
              <>
                <Link
                  href="/news/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all hover:scale-105 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {nt.newPost}
                </Link>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-xl transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 font-medium rounded-xl transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Admin
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-20 pt-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="w-8 h-8 text-green-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : error ? (
          <div className="glass-card rounded-3xl p-12 text-center space-y-4">
            <p className="text-slate-400">読み込みエラー / Erro ao carregar</p>
            <button
              onClick={fetchPosts}
              className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm transition-colors"
            >
              再試行 / Tentar novamente
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-300">{nt.noNews}</h2>
            <p className="text-slate-500">{nt.noNewsMsg}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <NewsCard
                key={post.id}
                post={post}
                lang={language}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                deleting={deletingId === post.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
