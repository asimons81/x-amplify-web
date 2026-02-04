'use server';

import { extractThesis, generateAllFormats } from '@/lib/gemini';
import { extractContentFromUrl, isValidUrl } from '@/lib/scraper';

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
