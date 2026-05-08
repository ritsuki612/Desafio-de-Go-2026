'use client';

import Link from 'next/link';
import PhotoCard from '@/components/PhotoCard';
import { useLanguage } from '@/contexts/LanguageContext';
import SvgIcon from '@/components/SvgIcon';

// 棋院・活動写真（全7枚を使用）
const KIIN_PHOTOS = [
  { src: '/images/nihonkiin/kiin1.jpg', alt: 'Sede do Brasil Nihon Kiin — São Paulo', placeholderVariant: 'venue' as const },
  { src: '/images/nihonkiin/kiin3.jpg', alt: 'Instrução de Go no Brasil Nihon Kiin', placeholderVariant: 'game' as const },
  { src: '/images/nihonkiin/kiin2.jpg', alt: 'Partidas no interior do Brasil Nihon Kiin', placeholderVariant: 'game' as const },
  { src: '/images/gallery/photo1.jpg', alt: 'Torneio de Go no Japan House, São Paulo', placeholderVariant: 'game' as const },
  { src: '/images/gallery/photo3.jpg', alt: 'Comunidade de Go', placeholderVariant: 'event' as const },
  { src: '/images/gallery/photo4.jpg', alt: 'Go na Universidade de São Paulo', placeholderVariant: 'venue' as const },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const at = t.about;

  return (
    <div className="page-enter">
      {/* ヒーローセクション */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          {/* ロゴバッジ */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-5 py-2 text-amber-400 text-sm font-medium">
            <SvgIcon name="torii" className="w-4 h-4" />
            Brasil Nihon Kiin · ブラジル日本棋院
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            {at.title}
          </h1>
          <p className="text-xl text-amber-400 font-medium">{at.subtitle}</p>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            {at.heroDesc}
          </p>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20 space-y-20">
        {/* ミッション・歴史 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 -mt-8">
          <div className="glass-card rounded-3xl p-8 space-y-4">
            <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center">
              <SvgIcon name="lightbulb" className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">{at.missionTitle}</h2>
            <p className="text-slate-300 leading-relaxed">{at.missionDesc}</p>
          </div>

          <div className="glass-card rounded-3xl p-8 space-y-4">
            <div className="w-10 h-10 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <SvgIcon name="book" className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white">{at.historyTitle}</h2>
            <p className="text-slate-300 leading-relaxed">{at.historyDesc}</p>
          </div>
        </section>

        {/* 活動内容 */}
        <section>
          <h2 className="text-3xl font-bold text-white text-center mb-10">{at.activitiesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {at.activities.map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 space-y-3 hover:border-amber-500/30 transition-colors text-center">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto">
                  <SvgIcon name={(['trophy', 'book', 'people', 'globe'] as const)[i]} className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* フォトギャラリー */}
        <section>
          <h2 className="text-3xl font-bold text-white text-center mb-10">{at.galleryTitle}</h2>

          {/* モザイクグリッド */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <PhotoCard
              src={KIIN_PHOTOS[0].src}
              alt={KIIN_PHOTOS[0].alt}
              placeholderVariant={KIIN_PHOTOS[0].placeholderVariant}
              className="row-span-2 h-full min-h-64 md:min-h-96"
            />
            <PhotoCard
              src={KIIN_PHOTOS[1].src}
              alt={KIIN_PHOTOS[1].alt}
              placeholderVariant={KIIN_PHOTOS[1].placeholderVariant}
              className="h-44 md:h-56"
            />
            <PhotoCard
              src={KIIN_PHOTOS[2].src}
              alt={KIIN_PHOTOS[2].alt}
              placeholderVariant={KIIN_PHOTOS[2].placeholderVariant}
              className="h-44 md:h-56"
            />
            <PhotoCard
              src={KIIN_PHOTOS[3].src}
              alt={KIIN_PHOTOS[3].alt}
              placeholderVariant={KIIN_PHOTOS[3].placeholderVariant}
              className="h-44 md:h-56"
            />
            <PhotoCard
              src={KIIN_PHOTOS[4].src}
              alt={KIIN_PHOTOS[4].alt}
              placeholderVariant={KIIN_PHOTOS[4].placeholderVariant}
              className="h-44 md:h-56"
            />
            <PhotoCard
              src={KIIN_PHOTOS[5].src}
              alt={KIIN_PHOTOS[5].alt}
              placeholderVariant={KIIN_PHOTOS[5].placeholderVariant}
              className="col-span-2 h-44 md:h-56"
            />
          </div>
        </section>

        {/* お問い合わせ */}
        <section className="glass-card rounded-3xl p-10 text-center space-y-5">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto">
            <SvgIcon name="torii" className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">{at.contactTitle}</h2>
          <p className="text-slate-300 max-w-md mx-auto">{at.contactDesc}</p>
          <p className="text-slate-400 text-sm">{at.address}</p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="https://wa.me/5511945018691"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +55 (11) 94501-8691
            </a>
            <Link
              href="/"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all"
            >
              {at.backHome}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
