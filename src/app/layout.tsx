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

const SITE_URL = 'https://igo-tournament.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Desafio de Go 2026 | 囲碁大会サンパウロ',
    template: '%s | Desafio de Go 2026',
  },
  description:
    'Torneio de Go (囲碁) para alunos da escola japonesa em São Paulo — 26 de Julho de 2026. Aprenda e jogue Go com o Brasil Nihon Kiin. 日本語学校生徒のための囲碁大会（サンパウロ）。',
  keywords: [
    '囲碁', 'igo', 'go', 'baduk',
    'torneio de go', '囲碁大会', 'campeonato de go',
    'Brasil Nihon Kiin', 'ブラジル日本棋院',
    'São Paulo', 'サンパウロ', 'escola japonesa', '日本語学校',
    'aprender go', '囲碁 入門',
  ],
  authors: [{ name: 'Brasil Nihon Kiin' }],
  openGraph: {
    title: 'Desafio de Go 2026 | 囲碁大会サンパウロ',
    description:
      'Torneio de Go (囲碁) para alunos da escola japonesa em São Paulo — 26 de Julho de 2026. Inscrições abertas!',
    url: SITE_URL,
    siteName: 'Desafio de Go 2026',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Desafio de Go 2026 — Brasil Nihon Kiin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desafio de Go 2026 | 囲碁大会サンパウロ',
    description: 'Torneio de Go para alunos da escola japonesa em São Paulo — 26 de Julho de 2026.',
    images: ['/images/hero-bg.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Brasil Nihon Kiin',
  url: SITE_URL,
  telephone: '+5511945018691',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'R. Manuel de Paiva, 45',
    addressLocality: 'Vila Mariana, São Paulo',
    addressRegion: 'SP',
    postalCode: '04106-020',
    addressCountry: 'BR',
  },
};

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Desafio de Go 2026 — 囲碁大会',
  description:
    'Torneio de Go (囲碁) para alunos da escola japonesa em São Paulo. Brasil Nihon Kiin主催の囲碁大会。',
  startDate: '2026-07-26T14:00:00-03:00',
  endDate: '2026-07-26T18:00:00-03:00',
  doorTime: '2026-07-26T13:30:00-03:00',
  isAccessibleForFree: true,
  maximumAttendeeCapacity: 30,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  url: SITE_URL,
  location: {
    '@type': 'Place',
    name: 'Brasil Nihon Kiin',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R. Manuel de Paiva, 45',
      addressLocality: 'Vila Mariana, São Paulo',
      addressRegion: 'SP',
      postalCode: '04106-020',
      addressCountry: 'BR',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Brasil Nihon Kiin',
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={geist.variable}>
      <body className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <LanguageProvider>
          <Header />
          <main className="flex-1 pt-16 relative z-0">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
