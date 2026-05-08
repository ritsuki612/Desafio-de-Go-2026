'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

// YouTubeの埋め込みコンポーネント
function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-video bg-slate-800 rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
      <p className="text-slate-300 text-sm font-medium">{title}</p>
    </div>
  );
}

export default function LearnPage() {
  const { t } = useLanguage();
  const lt = t.learn;

  return (
    <div className="page-enter py-12">
      {/* ページヘッダー */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black gradient-text">{lt.title}</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">{lt.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 space-y-16 pb-16">
        {/* 基本ルール */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-sm">📋</span>
            {lt.basicsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lt.basics.map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 動画チュートリアル */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-sm">▶</span>
            {lt.videosTitle}
          </h2>
          <p className="text-slate-400 mb-8">{lt.videosSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lt.videos.map((video, i) => (
              <YouTubeEmbed key={i} videoId={video.id} title={video.title} />
            ))}
          </div>
        </section>

        {/* 初心者向けのヒント */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-sm">💡</span>
            {lt.tipsTitle}
          </h2>
          <div className="glass-card rounded-2xl p-8">
            <ul className="space-y-4">
              {lt.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-0.5 w-6 h-6 bg-green-600/20 border border-green-600/40 rounded-full flex items-center justify-center flex-shrink-0 text-green-400 font-bold text-xs">
                    {i + 1}
                  </span>
                  <p className="text-slate-300 leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 大会参加CTA */}
        <section className="text-center py-8 border border-green-500/20 rounded-3xl bg-green-900/10">
          <h3 className="text-2xl font-bold text-white mb-3">{t.cta.title}</h3>
          <p className="text-slate-300 mb-6 max-w-md mx-auto">{t.cta.subtitle}</p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            {t.cta.button}
          </Link>
        </section>
      </div>
    </div>
  );
}
