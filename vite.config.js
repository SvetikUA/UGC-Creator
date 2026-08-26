import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const sanitySeoPlugin = () => {
  return {
    name: 'sanity-seo',
    async transformIndexHtml(html) {
      const query = encodeURIComponent(`*[_type == "siteSettings" && language == "en"][0]{seoTitle, seoDescription, "ogImageUrl": ogImage.asset->url}`);
      const url = `https://59s6zizo.api.sanity.io/v2023-05-03/data/query/production?query=${query}`;
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        const settings = data.result || {};
        
        const title = settings.seoTitle || 'Svitlana Yavorska | UGC Creator';
        const description = settings.seoDescription || 'UGC Creator Portfolio';
        const image = settings.ogImageUrl || 'https://svitlanayavorska.nl/favicon.svg';
        
        const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://svitlanayavorska.nl/" />
    <meta name="twitter:card" content="summary_large_image" />
        `;
        
        // Replace the default title tag with our dynamic meta tags
        return html.replace('<title>Svitlana Yavorska | UGC Creator</title>', metaTags);
      } catch (err) {
        console.error('Failed to fetch SEO tags from Sanity:', err);
        return html;
      }
    }
  };
};

export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
    sanitySeoPlugin()
  ],
});
