'use server';

import { extractThesis, generateAllFormats, generateSingleFormat } from '@/lib/gemini';
import { extractContentFromUrl, isValidUrl } from '@/lib/scraper';
import * as cheerio from 'cheerio';

export interface GenerationResult {
  thesis: string;
  posts: Record<string, string>;
  error?: string;
}

export async function generatePostsAction(input: string): Promise<GenerationResult> {
  try {
    let content = input;
    
    if (isValidUrl(input)) {
      content = await extractContentFromUrl(input);
    }

    const thesis = await extractThesis(content);
    const posts = await generateAllFormats(thesis);

    return { thesis, posts };
  } catch (e: any) {
    console.error("Action error:", e);
    return { 
      thesis: "", 
      posts: {}, 
      error: e.message || "Unknown error occurred" 
    };
  }
}

export async function regenerateSinglePostAction(thesis: string, formatKey: string): Promise<{ post: string; error?: string }> {
  try {
    const post = await generateSingleFormat(thesis, formatKey);
    return { post };
  } catch (e: any) {
    console.error("Regeneration error:", e);
    return { post: "", error: e.message || "Failed to regenerate post" };
  }
}

export async function getUrlPreviewAction(url: string): Promise<{ title: string; favicon: string } | null> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const title = $('title').text() || $('meta[property="og:title"]').attr('content') || url;
    let favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '/favicon.ico';
    
    if (favicon && !favicon.startsWith('http')) {
      const urlObj = new URL(url);
      favicon = `${urlObj.origin}${favicon.startsWith('/') ? '' : '/'}${favicon}`;
    }
    
    return { title, favicon };
  } catch (e) {
    return null;
  }
}
