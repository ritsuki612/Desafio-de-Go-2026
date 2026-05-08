import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  // 英数字・アンダースコア・ハイフンのみ許可（Drive file IDの形式）
  if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    return new NextResponse('Invalid ID', { status: 400 });
  }

  const driveUrl = `https://drive.google.com/uc?export=view&id=${id}`;

  try {
    const res = await fetch(driveUrl, {
      redirect: 'follow',
      headers: {
        // ブラウザと同じUser-Agentを使うとGoogleが正しく画像を返すことが多い
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
      },
    });

    const contentType = res.headers.get('content-type') ?? '';

    // HTMLが返ってきた = ログインページやウイルス確認ページ → 失敗扱い
    if (contentType.includes('text/html')) {
      return new NextResponse('Image unavailable', { status: 502 });
    }

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      },
    });
  } catch {
    return new NextResponse('Failed to fetch image', { status: 500 });
  }
}
