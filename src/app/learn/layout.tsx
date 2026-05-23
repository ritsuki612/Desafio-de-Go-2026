import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Aprenda Go (囲碁)',
  description:
    'Aprenda a jogar Go (囲碁) do zero. Regras básicas, estratégia e dicas para iniciantes. 囲碁のルールと基本戦略をゼロから学ぼう。',
  alternates: {
    canonical: 'https://igo-tournament.vercel.app/learn',
  },
  openGraph: {
    title: 'Aprenda Go (囲碁) | Desafio de Go 2026',
    description: 'Aprenda a jogar Go do zero — regras, estratégia e dicas para iniciantes.',
    url: 'https://igo-tournament.vercel.app/learn',
    type: 'website',
  },
};

export default function LearnLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
