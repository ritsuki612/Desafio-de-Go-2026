'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PhotoCardProps {
  // 実際の画像パスが入る（例: /images/gallery/photo1.jpg）
  src?: string;
  alt: string;
  caption?: string;
  className?: string;
  // 写真が未設定のときに表示するプレースホルダーの種類
  placeholderVariant?: 'game' | 'event' | 'portrait' | 'venue';
}

// 写真未設定時のプレースホルダー背景スタイル
const placeholderStyles: Record<string, string> = {
  game: 'from-emerald-950 via-slate-900 to-green-950',
  event: 'from-slate-900 via-amber-950 to-slate-900',
  portrait: 'from-slate-900 via-slate-800 to-slate-950',
  venue: 'from-slate-950 via-slate-800 to-emerald-950',
};

// プレースホルダーアイコン
const placeholderIcons: Record<string, string> = {
  game: '⬛⬜',
  event: '🎌',
  portrait: '👤',
  venue: '🏛️',
};

export default function PhotoCard({
  src,
  alt,
  caption,
  className = '',
  placeholderVariant = 'game',
}: PhotoCardProps) {
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !src || imgError;

  return (
    <figure className={`group overflow-hidden rounded-2xl ${className}`}>
      <div className="relative w-full h-full overflow-hidden">
        {showPlaceholder ? (
          // 写真未設定時のプレースホルダー（スタイリッシュなグラデーション）
          <div
            className={`w-full h-full min-h-48 bg-gradient-to-br ${placeholderStyles[placeholderVariant]} flex items-center justify-center`}
          >
            {/* 碁盤の格子パターン（装飾） */}
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id={`grid-${placeholderVariant}`} width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#6ee7b7" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${placeholderVariant})`} />
            </svg>
            <span className="relative text-4xl opacity-40 select-none">
              {placeholderIcons[placeholderVariant]}
            </span>
          </div>
        ) : (
          // 実際の写真
          <div className="relative w-full h-full min-h-48">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* ホバー時のオーバーレイ */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="px-3 py-2 text-xs text-slate-500 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
