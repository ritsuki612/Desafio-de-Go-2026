import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

async function sendConfirmationEmail(name: string, email: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Desafio de Go 2026" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Inscrição confirmada — Desafio de Go 2026',
    text: `Olá, ${name}, é um prazer conhecê-lo(a)! Obrigado por se inscrever no torneio.\n\nEnviaremos todas as informações relacionadas ao torneio por aqui conforme forem sendo atualizadas.\n\nSerá um prazer tê-lo(a) no torneio. Até lá!`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
        <h2 style="color: #4ade80; margin-bottom: 24px;">⬤ Desafio de Go 2026</h2>
        <p style="font-size: 16px; line-height: 1.6;">
          Olá, <strong>${name}</strong>, é um prazer conhecê-lo(a)! Obrigado por se inscrever no torneio.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">
          Enviaremos todas as informações relacionadas ao torneio por aqui conforme forem sendo atualizadas.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">
          Será um prazer tê-lo(a) no torneio. Até lá!
        </p>
        <hr style="border: none; border-top: 1px solid #334155; margin: 24px 0;" />
        <p style="font-size: 13px; color: #64748b;">Brasil Nihon Kiin — São Paulo, Brasil</p>
      </div>
    `,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // 確認メール送信
  let emailSent = false;
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      await sendConfirmationEmail(body.name, body.email);
      emailSent = true;
    } catch (err) {
      console.error('メール送信エラー:', err);
    }
  } else {
    console.error('メール未送信: GMAIL_USER / GMAIL_APP_PASSWORD が設定されていません');
  }

  // Google スプレッドシートへの転送（設定済みの場合）
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error('スプレッドシート送信エラー:', err);
    }
  }

  return NextResponse.json({ success: true, emailSent });
}
