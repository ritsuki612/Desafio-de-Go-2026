'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PasswordGate, { getStoredPassword } from '@/components/PasswordGate';

const MAX_PHOTOS = 3;
const MAX_WIDTH = 800;
const JPEG_QUALITY = 0.60;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new window.Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function NewPostPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const nt = t.news;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const remaining = MAX_PHOTOS - photos.length;
      const compressed = await Promise.all(files.slice(0, remaining).map(compressImage));
      setPhotos((prev) => [...prev, ...compressed]);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function validate() {
    const errs: { title?: string; content?: string } = {};
    if (!title.trim()) errs.title = nt.required;
    if (!content.trim()) errs.content = nt.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'news',
          password: getStoredPassword(),
          title: title.trim(),
          content: content.trim(),
          photos,
          publishedAt: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? 'Unknown error');
      router.push('/news');
    } catch (err) {
      setSubmitError(String(err));
      setSubmitting(false);
    }
  }

  return (
    <PasswordGate>
    <div className="page-enter">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-5 py-2 text-green-400 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {nt.newPost}
          </div>
          <h1 className="text-4xl font-black text-white">{nt.formTitle}</h1>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 pb-20 -mt-4">
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-7">
          {/* タイトル */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">
              {nt.fieldTitle} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: undefined })); }}
              placeholder={nt.fieldTitlePlaceholder}
              className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-colors ${
                errors.title
                  ? 'border-red-500 focus:ring-red-500/40'
                  : 'border-slate-700 focus:ring-green-500/40 focus:border-green-600'
              }`}
            />
            {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
          </div>

          {/* 本文 */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">
              {nt.fieldContent} <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: undefined })); }}
              placeholder={nt.fieldContentPlaceholder}
              className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-colors resize-none ${
                errors.content
                  ? 'border-red-500 focus:ring-red-500/40'
                  : 'border-slate-700 focus:ring-green-500/40 focus:border-green-600'
              }`}
            />
            {errors.content && <p className="text-red-400 text-xs">{errors.content}</p>}
          </div>

          {/* 写真 */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-300">
              {nt.addPhotos}
            </label>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {photos.map((src, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600/90 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove photo"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {photos.length < MAX_PHOTOS && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full border-2 border-dashed border-slate-600 hover:border-green-600 rounded-xl py-8 flex flex-col items-center gap-2 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <svg className="w-6 h-6 text-slate-400 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <svg className="w-8 h-8 text-slate-500 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                      {nt.photosHint}
                    </span>
                    <span className="text-xs text-slate-600">{photos.length}/{MAX_PHOTOS}</span>
                  </>
                )}
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {submitError && (
            <p className="text-red-400 text-sm bg-red-500/10 rounded-xl px-4 py-3">{submitError}</p>
          )}

          {/* ボタン */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/news"
              className="flex-1 text-center py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors"
            >
              {nt.cancel}
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {submitting && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {submitting ? '...' : nt.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
    </PasswordGate>
  );
}
