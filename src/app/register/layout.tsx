import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Inscrição no Torneio | 参加申込',
  description:
    'Inscreva-se no Desafio de Go 2026 — torneio de Go para alunos da escola japonesa em São Paulo, 26 de Julho de 2026. 囲碁大会の参加申込はこちら。',
  alternates: {
    canonical: 'https://igo-tournament.vercel.app/register',
  },
  openGraph: {
    title: 'Inscrição no Torneio | 参加申込 | Desafio de Go 2026',
    description:
      'Inscreva-se no Desafio de Go 2026 — 26 de Julho de 2026 em São Paulo. Vagas limitadas!',
    url: 'https://igo-tournament.vercel.app/register',
    type: 'website',
  },
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
