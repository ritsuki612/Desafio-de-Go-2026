'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const instructors = [
  {
    id: 'ritsuki',
    name: 'Ritsuki Hasegawa',
    photo: '/instructors/ritsuki.jpg',
    bio: `Olá a todos!
Meu nome é Hasegawa Ritsuki e sou o organizador deste torneio.
Nos últimos dois anos, trabalhei como voluntário da JICA no Brasil, promovendo o Go por aqui.
Hoje em dia temos acesso fácil a tantas formas de entretenimento, como videogames e afins, mas meu desejo é que vocês possam sentir a alegria de sentar diante do tabuleiro e pensar com calma.
O Go é simples — e é exatamente por isso que ele é tão profundo.`,
  },
  {
    id: 'pedro',
    name: 'Pedro Vendrametto',
    photo: '/instructors/pedro.jpg',
    bio: `Olá pessoal.
Meu nome é Pedro Vendrametto e serei um instrutor para ajudar a prepara-los para o torneio.
Trabalho na Associação Brasil Nihon-Kiin. Nosso objetivo é expandir o jogo de Go no Brasil, e torna-lo mais acessível para todos que se aventuram neste universo infinito de possibilidades. Vou garantir o que o aprendizado seja divertido e duradouro.`,
  },
  {
    id: 'camila',
    name: 'Camila Medeiros',
    photo: '/instructors/camila.jpg',
    bio: `Olá, espero que estejam bem.

Meu nome é Camila Medeiros e vou acompanhá-los e ensiná-los durante esse caminho que decidiram trilhar.

Há um ano conheci o Go e, desde então, venho estudando e me apaixonando cada vez mais por ele. É um jogo milenar, divertido, profundo e especial, torço para que vocês descubram isso também.

Aproveitem! e para o torneio: boa sorte!`,
  },
];

function Avatar({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-800">
        <svg className="w-20 h-20 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className="w-full h-full object-cover"
      onError={() => setError(true)}
    />
  );
}

export default function InstructorsPage() {
  const { t } = useLanguage();
  const it = t.instructors;

  return (
    <div className="page-enter">
      {/* ヒーロー */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-5 py-2 text-green-400 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Desafio de Go 2026
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white">{it.title}</h1>
          <p className="text-slate-400 text-lg">{it.subtitle}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-20 pt-10 space-y-8">
        {instructors.map((instructor) => (
          <article key={instructor.id} className="glass-card rounded-3xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* 写真 */}
              <div className="md:w-56 md:shrink-0 h-64 md:h-auto overflow-hidden">
                <Avatar src={instructor.photo} name={instructor.name} />
              </div>
              {/* テキスト */}
              <div className="p-6 md:p-8 space-y-3 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-white">{instructor.name}</h2>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{instructor.bio}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
