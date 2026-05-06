export interface NewsPost {
  id: string;
  title: string;
  content: string;
  photos: string[]; // base64 data URLs (up to 3)
  publishedAt: string; // ISO date string
}

const KEY = 'igo_news_posts';

export function getNewsPosts(): NewsPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(KEY);
    return data ? (JSON.parse(data) as NewsPost[]) : [];
  } catch {
    return [];
  }
}

export function saveNewsPost(post: NewsPost): void {
  const posts = getNewsPosts();
  posts.unshift(post);
  localStorage.setItem(KEY, JSON.stringify(posts));
}

export function deleteNewsPost(id: string): void {
  const posts = getNewsPosts().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(posts));
}
