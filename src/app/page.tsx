'use client';

import Link from 'next/link';
import Image from 'next/image';
import GoBoard from '@/components/GoBoard';
import PhotoCard from '@/components/PhotoCard';
import { useLanguage } from '@/contexts/LanguageContext';
import SvgIcon from '@/components/SvgIcon';

// ギャラリー写真（public/images/gallery/）
const GALLERY_PHOTOS = [
  { src: '/images/gallery/photo1.jpg', alt: 'Partida de Go no Japan House, São Paulo', placeholderVariant: 'game' as const },
  { src: '/images/gallery/photo2.jpg', alt: 'Alunos do ensino médio aprendendo Go', placeholderVariant: 'event' as const },
  { src: '/images/gallery/photo3.jpg', alt: 'Foto de grupo — evento de Go', placeholderVariant: 'event' as const },
  { src: '/images/gallery/photo4.jpg', alt: 'Go na Universidade de São Paulo', placeholderVariant: 'venue' as const },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="page-enter">
      {/* ヒーローセクション — 全面写真背景 */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* 背景写真 */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Go board with stones"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* 左から右へのグラデーションオーバーレイ（テキスト可読性確保） */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />
        {/* 下部フェード */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full py-24">
          <div className="max-w-xl space-y-7">
            {/* バッジ */}
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-green-400 text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {t.hero.badge}
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="gradient-text">{t.hero.title}</span>
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/learn"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                {t.hero.ctaLearn}
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-900/50"
              >
                {t.hero.ctaRegister}
              </Link>
            </div>
          </div>
        </div>

        {/* スクロールヒント */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 text-sm flex flex-col items-center gap-2 animate-bounce">
          <span>{t.hero.scrollHint}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* 囲碁とはセクション */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">{t.whatIsGo.title}</h2>
              <p className="text-slate-300 leading-relaxed text-lg">{t.whatIsGo.description}</p>
              <ul className="space-y-3">
                {t.whatIsGo.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center gap-4">
              <GoBoard size={300} />
              <p className="text-slate-500 text-sm text-center">{t.whatIsGo.imageCaption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 大会情報セクション */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{t.tournament.title}</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">{t.tournament.description}</p>
          </div>

          {/* 大会詳細カード */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { title: t.tournament.card1Title, value: t.tournament.card1Value, iconName: 'calendar' },
              { title: t.tournament.card2Title, value: t.tournament.card2Value, iconName: 'board' },
              { title: t.tournament.card3Title, value: t.tournament.card3Value, iconName: 'bars' },
              { title: t.tournament.card4Title, value: t.tournament.card4Value, iconName: 'tag' },
            ].map((card, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto">
                  <SvgIcon name={card.iconName} className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-sm text-slate-400 font-medium">{card.title}</div>
                <div className="text-xl font-bold text-white">{card.value}</div>
              </div>
            ))}
          </div>

          {/* 会場情報 */}
          <div className="mb-16">
            <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{t.tournament.venueLabel}</p>
                <p className="text-white text-xl font-bold">{t.tournament.venueName}</p>
                <p className="text-slate-300">{t.tournament.venueAddress}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('R. Manuel de Paiva, 45 - Vila Mariana, São Paulo - SP, 04106-020')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                {t.tournament.venueMapLink}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* 参加する理由 */}
          <h3 className="text-2xl font-bold text-white text-center mb-8">{t.features.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((item, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 space-y-3 hover:border-green-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <SvgIcon name={(['lightbulb', 'torii', 'people', 'trophy'] as const)[i]} className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* フォトギャラリーセクション */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">{t.gallery.title}</h2>
            <p className="text-slate-400">{t.gallery.subtitle}</p>
          </div>

          {/* モザイクグリッド — 4枚 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* 左：大きいカード（2行分）— 対局シーン */}
            <PhotoCard
              src={GALLERY_PHOTOS[0].src}
              alt={GALLERY_PHOTOS[0].alt}
              placeholderVariant={GALLERY_PHOTOS[0].placeholderVariant}
              className="row-span-2 h-full min-h-72 md:min-h-96"
            />
            {/* 右上：中学生 */}
            <PhotoCard
              src={GALLERY_PHOTOS[1].src}
              alt={GALLERY_PHOTOS[1].alt}
              placeholderVariant={GALLERY_PHOTOS[1].placeholderVariant}
              className="md:col-span-2 h-44 md:h-52"
            />
            {/* 右下：集合写真 */}
            <PhotoCard
              src={GALLERY_PHOTOS[2].src}
              alt={GALLERY_PHOTOS[2].alt}
              placeholderVariant={GALLERY_PHOTOS[2].placeholderVariant}
              className="h-44 md:h-52"
            />
            {/* 右下2：USP — デスクトップのみ表示 */}
            <PhotoCard
              src={GALLERY_PHOTOS[3].src}
              alt={GALLERY_PHOTOS[3].alt}
              placeholderVariant={GALLERY_PHOTOS[3].placeholderVariant}
              className="hidden md:block h-52"
            />
          </div>
        </div>
      </section>

      {/* 主催者セクション */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                {t.organizer.label}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t.organizer.name}
              </h2>
              <p className="text-green-400 font-medium">{t.organizer.tagline}</p>
              <p className="text-slate-300 leading-relaxed">{t.organizer.desc}</p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-medium transition-colors group"
              >
                {t.organizer.learnMore}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 棋院の写真エリア */}
            <div className="grid grid-cols-2 gap-3">
              <PhotoCard
                src="/images/nihonkiin/kiin1.jpg"
                alt="Brasil Nihon Kiin"
                placeholderVariant="venue"
                className="h-48 rounded-2xl"
              />
              <PhotoCard
                src="/images/nihonkiin/kiin2.jpg"
                alt="Brasil Nihon Kiin event"
                placeholderVariant="event"
                className="h-48 rounded-2xl"
              />
              <PhotoCard
                src="/images/nihonkiin/kiin3.jpg"
                alt="Go players at Brasil Nihon Kiin"
                placeholderVariant="game"
                className="col-span-2 h-40 rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTAバナー */}
      <section className="py-24 bg-gradient-to-r from-green-900/40 to-amber-900/20 border-y border-green-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-white">{t.cta.title}</h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">{t.cta.subtitle}</p>
          <Link
            href="/register"
            className="inline-block px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-900/50"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
