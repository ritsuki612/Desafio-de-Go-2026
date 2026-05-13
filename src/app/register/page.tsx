'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { saveProfile, type UserProfile } from '@/lib/storage';

type Level = 'beginner' | 'novice' | 'intermediate';

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  school?: string;
  level?: string;
}

export default function RegisterPage() {
  const { t, language } = useLanguage();
  const rt = t.register;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    school: '',
    level: '' as Level | '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);


  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = rt.required;
    if (!formData.email.trim()) {
      newErrors.email = rt.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = rt.invalidEmail;
    }
    if (!formData.age.trim() || isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = rt.required;
    }
    if (!formData.school.trim()) newErrors.school = rt.required;
    if (!formData.level) newErrors.level = rt.required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const profile: UserProfile = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: formData.age.trim(),
      school: formData.school.trim(),
      level: formData.level as Level,
      registeredAt: new Date().toISOString(),
    };

    // Google スプレッドシートへ送信
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, language }),
      });
    } catch {
      // 送信失敗でも申込は続行（シート記録なしで localStorage のみ保存）
    }

    // ブラウザの localStorage に保存（ログイン状態管理用）
    saveProfile(profile);

    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-slate-800 border ${
      errors[field] ? 'border-red-500' : 'border-slate-600'
    } text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors placeholder-slate-500`;

  // 登録完了表示
  if (submitted) {
    return (
      <div className="page-enter min-h-[60vh] flex items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-10 max-w-md w-full text-center space-y-6">
          <div className="text-6xl animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold text-white">{rt.success}</h2>
          <p className="text-slate-300">{rt.successMsg}</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', age: '', school: '', level: '' });
              setErrors({});
            }}
            className="w-full px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all hover:scale-105"
          >
            {rt.registerAnother}
          </button>
          <Link
            href="/"
            className="inline-block text-slate-400 hover:text-white text-sm transition-colors"
          >
            {rt.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter py-12">
      {/* ページヘッダー */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 pt-8 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black gradient-text">{rt.title}</h1>
          <p className="text-slate-300 text-lg">{rt.subtitle}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8 pb-16">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="glass-card rounded-3xl p-8 md:p-10 space-y-6"
        >
          {/* お名前 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              {rt.name} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={rt.namePlaceholder}
              className={inputClass('name')}
              autoComplete="name"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
          </div>

          {/* メールアドレス */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              {rt.email} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={rt.emailPlaceholder}
              className={inputClass('email')}
              autoComplete="email"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          {/* 年齢 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              {rt.age} <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min={1}
              max={120}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder={rt.agePlaceholder}
              className={inputClass('age')}
            />
            {errors.age && <p className="text-red-400 text-sm">{errors.age}</p>}
          </div>

          {/* 学校名 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              {rt.school} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              placeholder={rt.schoolPlaceholder}
              className={inputClass('school')}
            />
            {errors.school && <p className="text-red-400 text-sm">{errors.school}</p>}
          </div>

          {/* レベル選択 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              {rt.level} <span className="text-red-400">*</span>
            </label>
            <div className="space-y-3">
              {(
                [
                  { value: 'beginner', label: rt.levelBeginner },
                  { value: 'novice', label: rt.levelNovice },
                  { value: 'intermediate', label: rt.levelIntermediate },
                ] as { value: Level; label: string }[]
              ).map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                    formData.level === option.value
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="level"
                    value={option.value}
                    checked={formData.level === option.value}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value as Level })
                    }
                    className="w-4 h-4 accent-green-500"
                  />
                  <span className="text-slate-300 text-sm">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.level && <p className="text-red-400 text-sm">{errors.level}</p>}
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-wait text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                ...
              </span>
            ) : (
              rt.submit
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
