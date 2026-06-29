import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arventispartners.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/services/consulting',
    '/services/legal',
    '/our-people',
    '/contact',
    '/disclaimer',
    '/faq',
  ];

  const teamSlugs = ['suman-thakur', 'yash-thakur', 'sweta-verma', 'adarsh-kashyap', 'anshuman-mohanty'];

  const teamRoutes = teamSlugs.map((slug) => `/our-people/${slug}`);

  const allPaths = [...routes, ...teamRoutes];

  return allPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : path.startsWith('/services') || path === '/our-people' ? 0.8 : 0.6,
  }));
}
