import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Notícias | ニュース',
  description:
    'Últimas notícias e atualizações sobre o Desafio de Go 2026 e o Brasil Nihon Kiin. 囲碁大会の最新ニュース。',
  alternates: {
    canonical: 'https://igo-tournament.vercel.app/news',
  },
  openGraph: {
    title: 'Notícias | ニュース | Desafio de Go 2026',
    description: 'Últimas notícias e atualizações sobre o Desafio de Go 2026.',
    url: 'https://igo-tournament.vercel.app/news',
    type: 'website',
  },
};

export default function NewsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
