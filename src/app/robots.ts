import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/news/new'],
    },
    sitemap: 'https://igo-tournament.vercel.app/sitemap.xml',
  };
}
