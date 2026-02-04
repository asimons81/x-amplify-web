import * as cheerio from 'cheerio';

export function isValidUrl(text: string): boolean {
  try {
    const url = new URL(text.trim());
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

export async function extractContentFromUrl(url: string): Promise<string> {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  };

  const response = await fetch(url.trim(), { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove script and style elements
  $('script, style, nav, header, footer, aside').remove();

  let mainContent: cheerio.Cheerio<any> | null = null;

  // Priority: article > main > body
  const selectors = ['article', 'main', '[role="main"]', '.post-content', '.article-body'];
  for (const selector of selectors) {
    const el = $(selector);
    if (el.length > 0) {
      mainContent = el;
      break;
    }
  }

  if (!mainContent) {
    mainContent = $('body');
  }

  // Extract text
  let text = mainContent.text() || $.text();

  // Clean up excessive whitespace
  text = text.replace(/\n{3,}/g, '\n\n').replace(/ {2,}/g, ' ');

  // Limit content length
  const MAX_CHARS = 8000;
  if (text.length > MAX_CHARS) {
    text = text.slice(0, MAX_CHARS) + "...";
  }

  return text.trim();
}
