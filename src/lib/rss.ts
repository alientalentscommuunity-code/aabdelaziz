import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string[];
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
}

const SITE_URL = 'https://aabdelaziz.netlify.app';
const SITE_NAME = 'ALIENs Universe | Ahmad Abdelaziz';
const DESCRIPTION = 'Personal portfolio, vision board, and blog of Ahmad Abdelaziz - AI Product Manager & Full-Stack Builder';

export const generateRSSFeed = async (): Promise<string> => {
  try {
    // Fetch public blog posts
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('privacy', 'public')
      .order('published_at', { ascending: false })
      .limit(20);

    const blogPosts = posts || [];

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/favicon.svg</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
    ${blogPosts.map(post => generateRSSItem(post)).join('')}
  </channel>
</rss>`;

    return rss;
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return '';
  }
};

const generateRSSItem = (post: BlogPost): string => {
  const pubDate = post.published_at 
    ? new Date(post.published_at).toUTCString() 
    : new Date(post.created_at).toUTCString();
  
  const link = `${SITE_URL}/blog#${post.slug}`;
  
  // Strip HTML tags for description
  const plainContent = post.content.replace(/<[^>]*>/g, '').substring(0, 300);
  const description = post.excerpt || plainContent || '';

  return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${post.category}</category>
      ${post.tags?.map(tag => `<category>${tag}</category>`).join('') || ''}
      <description><![CDATA[${description}...]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      ${post.cover_image ? `<enclosure url="${post.cover_image}" type="image/jpeg" />` : ''}
    </item>`;
};

// Hook to use RSS feed
export const useRSSFeed = () => {
  const downloadRSS = async () => {
    const rss = await generateRSSFeed();
    if (!rss) return;

    const blob = new Blob([rss], { type: 'application/rss+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rss.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRSSLink = () => {
    return `${SITE_URL}/rss.xml`;
  };

  return { downloadRSS, getRSSLink };
};
