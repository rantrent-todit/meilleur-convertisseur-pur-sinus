import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site.config';

export const GET: APIRoute = () => {
  const content = `User-agent: *
Allow: /

Sitemap: ${siteConfig.siteDomain}/sitemap-index.xml
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
