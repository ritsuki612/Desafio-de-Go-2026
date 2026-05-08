// サイト全体で使用するSVGアイコン — ストローク統一スタイル

interface SvgIconProps {
  name: string;
  className?: string;
}

// 全アイコン共通のSVG属性
const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export default function SvgIcon({ name, className = 'w-6 h-6' }: SvgIconProps) {
  const icons: Record<string, React.ReactNode> = {

    // カレンダー（開催日）
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="14" x2="8" y2="14" strokeWidth={2.5} />
        <line x1="12" y1="14" x2="12" y2="14" strokeWidth={2.5} />
        <line x1="16" y1="14" x2="16" y2="14" strokeWidth={2.5} />
      </>
    ),

    // 碁盤（9路盤フォーマット）
    board: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="9" cy="15" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),

    // 上昇バー（レベル）
    bars: (
      <>
        <rect x="3" y="15" width="4" height="6" rx="1" />
        <rect x="10" y="10" width="4" height="11" rx="1" />
        <rect x="17" y="5" width="4" height="16" rx="1" />
      </>
    ),

    // タグ（無料）
    tag: (
      <>
        <path d="M12 2H6a2 2 0 00-2 2v6l8 12 8-8L12 2z" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),

    // 電球（思考力・戦略）
    lightbulb: (
      <>
        <path d="M9 18h6M10 22h4M15.1 14c.2-1 .6-1.7 1.4-2.5A4.6 4.6 0 0018 8a6 6 0 10-12 0c0 1 .2 2.2 1.5 3.5A4.6 4.6 0 008.9 14" />
        <line x1="12" y1="2" x2="12" y2="3" />
        <line x1="4.2" y1="4.2" x2="5" y2="5" />
        <line x1="19.8" y1="4.2" x2="19" y2="5" />
      </>
    ),

    // 鳥居（日本文化）
    torii: (
      <>
        <line x1="3" y1="21" x2="21" y2="21" />
        <line x1="7" y1="21" x2="7" y2="9" />
        <line x1="17" y1="21" x2="17" y2="9" />
        <path d="M3 9h18" />
        <path d="M4.5 6.5h15" />
        <line x1="7" y1="6.5" x2="6" y2="4" />
        <line x1="17" y1="6.5" x2="18" y2="4" />
        <path d="M6 4c2-1.5 4-2 6-2s4 .5 6 2" />
      </>
    ),

    // 人々（コミュニティ）
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M16 3.1a4 4 0 010 7.8" />
        <path d="M21 21v-2a4 4 0 00-3-3.9" />
      </>
    ),

    // トロフィー（体験・達成）
    trophy: (
      <>
        <path d="M7 4v6a5 5 0 0010 0V4" />
        <line x1="4" y1="4" x2="7" y2="4" />
        <line x1="17" y1="4" x2="20" y2="4" />
        <path d="M4 4v2a3 3 0 003 3" />
        <path d="M20 4v2a3 3 0 01-3 3" />
        <line x1="12" y1="14" x2="12" y2="17" />
        <path d="M8 21h8" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </>
    ),

    // 本（指導・学習）
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="13" y2="11" />
      </>
    ),

    // 地球（オンライン）
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3c-1.5 2.5-2.5 5.5-2.5 9s1 6.5 2.5 9" />
        <path d="M12 3c1.5 2.5 2.5 5.5 2.5 9s-1 6.5-2.5 9" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </>
    ),
  };

  return (
    <svg {...svgProps} className={className}>
      {icons[name] ?? null}
    </svg>
  );
}
