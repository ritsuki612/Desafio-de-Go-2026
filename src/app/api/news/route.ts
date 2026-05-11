import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const ADMIN_HASH = '175442ef1b655771a7c20aba7660c3db6ced384577fae05e74d1f161c2e0d30e';

function checkPassword(password: unknown): boolean {
  if (typeof password !== 'string' || !password) return false;
  return createHash('sha256').update(password).digest('hex') === ADMIN_HASH;
}

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
  const body = await req.json();

  // パスワード検証のみ
  if (body.action === 'verify') {
    return checkPassword(body.password)
      ? NextResponse.json({ success: true })
      : NextResponse.json({ success: false }, { status: 401 });
  }

  // 全操作にパスワード必須
  if (!checkPassword(body.password)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!WEBHOOK_URL) {
    return NextResponse.json(
      { success: false, error: 'GOOGLE_SHEETS_WEBHOOK_URL が設定されていません' },
      { status: 500 },
    );
  }
  try {
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
