import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Desafio de Go 2026',
  description:
    'Torneio de Go para alunos da escola japonesa / 日本語学校生徒のための囲碁大会 — 26 de Julho / 7月26日',
  keywords: ['igo', 'go', '囲碁', 'torneio', '大会', 'japonês', '日本語'],
  openGraph: {
    title: 'Desafio de Go 2026',
    description: 'Aprenda Go e participe do torneio especial de 26 de Julho!',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={geist.variable}>
      <body className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
        <LanguageProvider>
          <Header />
          <main className="flex-1 pt-16 relative z-0">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
