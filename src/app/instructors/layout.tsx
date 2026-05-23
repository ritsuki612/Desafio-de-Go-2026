import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Instrutores de Go | 囲碁インストラクター',
  description:
    'Conheça os instrutores do Desafio de Go 2026: Ritsuki, Pedro e Camila. 囲碁大会のインストラクターを紹介します。',
  alternates: {
    canonical: 'https://igo-tournament.vercel.app/instructors',
  },
  openGraph: {
    title: 'Instrutores de Go | 囲碁インストラクター | Desafio de Go 2026',
    description: 'Conheça os instrutores do Desafio de Go 2026: Ritsuki, Pedro e Camila.',
    url: 'https://igo-tournament.vercel.app/instructors',
    type: 'website',
  },
};

export default function InstructorsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
