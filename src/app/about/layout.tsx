import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Sobre o Brasil Nihon Kiin | ブラジル日本棋院',
  description:
    'Conheça o Brasil Nihon Kiin (ブラジル日本棋院), a maior organização de Go do Brasil, localizada em São Paulo. Historia, missão e atividades.',
  alternates: {
    canonical: 'https://igo-tournament.vercel.app/about',
  },
  openGraph: {
    title: 'Sobre o Brasil Nihon Kiin | ブラジル日本棋院',
    description:
      'Conheça o Brasil Nihon Kiin — a maior organização de Go do Brasil, em São Paulo.',
    url: 'https://igo-tournament.vercel.app/about',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
