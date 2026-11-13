import fs from 'fs';
const SITE_URL = 'https://documentswithoutborders.org';
const SITE_TITLE = 'Documents Without Borders';
const SITE_DESCRIPTION = 'Notarization, apostille, authentication, and translation services for documents used across borders.';
const posts = JSON.parse(fs.readFileSync('./posts.json', 'utf-8'));
function escapeXml(str = '') { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;'); }
const items = posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${post.link}</link>
      <guid>${post.guid || post.link}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${post.date}</pubDate>
    </item>`).join('');
const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
fs.mkdirSync('./public', { recursive: true });
fs.writeFileSync('./public/feed.xml', xml.trim());
fs.writeFileSync('./feed.xml', xml.trim());
console.log('RSS feed generated');
