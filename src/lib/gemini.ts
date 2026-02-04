import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { POSTS_JSON_SCHEMA, STIJN_METHOD_PROMPT, THESIS_EXTRACTION_PROMPT } from "./prompts";
import { validateAllPosts, hasCriticalIssues, ValidationResult } from "./validator";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  // We don't throw immediately to allow build time, but runtime will fail
  console.warn("GEMINI_API_KEY is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Use the same model as the Python version if possible
// The Python code used "gemini-3-flash-preview". 
// We'll use "gemini-3-pro-preview" as a stable fallback if 3 is not available in Node SDK yet, 
// but try to respect the user's config.
const MODEL_NAME = "gemini-3-flash-preview"; 

export async function extractThesis(content: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = THESIS_EXTRACTION_PROMPT.replace("{input_content}", content);

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 100,
    },
  });

  return result.response.text().trim();
}

export async function generateAllFormats(thesis: string, maxRetries = 2): Promise<Record<string, string>> {
  const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: POSTS_JSON_SCHEMA as any, // Cast to any because TS types might mismatch SDK version
    }
  });

  let prompt = STIJN_METHOD_PROMPT.replace("{thesis}", thesis);

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    console.log(`Generating posts attempt ${attempt + 1}...`);
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 4000,
        },
      });

      const text = result.response.text();
      let posts: Record<string, string>;
      
      try {
        posts = JSON.parse(text);
      } catch (e) {
        console.error("JSON parse failed, trying regex");
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          posts = JSON.parse(match[0]);
        } else {
          throw new Error("No JSON found in response");
        }
      }

      // Validate
      const validationResults = validateAllPosts(posts);

      // Auto-fix
      for (const [key, result] of Object.entries(validationResults)) {
        if (result.cleanedContent) {
          posts[key] = result.cleanedContent;
        }
      }

      if (!hasCriticalIssues(validationResults) || attempt === maxRetries) {
        // Unescape newlines
        for (const key in posts) {
          posts[key] = posts[key].replace(/\\n/g, '\n');
        }
        return posts;
      }

      prompt += "\n\nIMPORTANT: Previous attempt contained em dashes. DO NOT use — anywhere.";

    } catch (e) {
      console.error(`Generation failed on attempt ${attempt + 1}:`, e);
      if (attempt === maxRetries) throw e;
    }
  }
  throw new Error("Failed to generate valid posts after retries");
}

export async function generateSingleFormat(thesis: string, formatKey: string): Promise<string> {
  const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          post: { type: SchemaType.STRING }
        },
        required: ["post"]
      } as any
    }
  });

  const prompt = `
  You are an elite X (Twitter) ghostwriter trained on the viral strategies of Stijn Noorman.
  Generate exactly ONE post for the thesis provided using the format: ${formatKey.replace('_', ' ').toUpperCase()}.

  THE THESIS:
  ${thesis}

  FORMAT DESCRIPTION:
  ${STIJN_METHOD_PROMPT.split('═══════════════════════════════════════════════════════════════════════════════')[1]}

  GLOBAL STYLE CONSTRAINTS:
  ${STIJN_METHOD_PROMPT.split('═══════════════════════════════════════════════════════════════════════════════')[2]}

  OUTPUT: Return a JSON object with a single key "post".
  `;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 500,
    },
  });

  const text = result.response.text();
  const parsed = JSON.parse(text);
  let post = parsed.post.replace(/\\n/g, '\n');
  
  // Quick validation
  const validation = validateAllPosts({ [formatKey]: post });
  if (validation[formatKey].cleanedContent) {
    post = validation[formatKey].cleanedContent;
  }
  
  return post;
}
