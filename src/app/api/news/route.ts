import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

// ニュース一覧取得
export async function GET() {
  if (!WEBHOOK_URL) {
    return NextResponse.json({ success: true, posts: [] });
  }
  try {
    const res = await fetch(`${WEBHOOK_URL}?action=news`, {
      redirect: 'follow',
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false, posts: [] });
  }
}

// ニュース投稿 / 削除
export async function POST(req: NextRequest) {
  if (!WEBHOOK_URL) {
    return NextResponse.json(
      { success: false, error: 'GOOGLE_SHEETS_WEBHOOK_URL が設定されていません' },
      { status: 500 },
    );
  }
  try {
    const body = await req.json();
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
