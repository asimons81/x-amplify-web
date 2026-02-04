export interface ValidationResult {
  isValid: boolean;
  issues: string[];
  cleanedContent: string | null;
}

const FORBIDDEN_PATTERNS: [RegExp, string][] = [
  [/—/g, 'Em dash detected'],
  [/\bdelve\b/i, 'AI phrase "delve" detected'],
  [/\bgame-?changer\b/i, 'AI phrase "game-changer" detected'],
  [/[Ii]n today'?s world/i, 'AI phrase "In today\'s world" detected'],
  [/[Hh]ere'?s the thing/i, 'AI phrase "Here\'s the thing" detected'],
  [/\bleveraging\b/i, 'AI phrase "leveraging" detected'],
  [/\bunlock\b/i, 'AI phrase "unlock" detected'],
  [/\btransformative\b/i, 'AI phrase "transformative" detected'],
];

export function validatePost(content: string): ValidationResult {
  const issues: string[] = [];
  let cleaned = content;

  for (const [pattern, message] of FORBIDDEN_PATTERNS) {
    if (pattern.test(content)) {
      issues.push(message);
      
      // Auto-fix em dashes
      if (message.includes('Em dash')) {
        cleaned = cleaned.replace(pattern, '.');
      }
    }
  }

  // Check for walls of text
  if (content.length > 200 && !content.includes('\n')) {
    issues.push('Wall of text detected (missing line breaks)');
  }

  return {
    isValid: issues.length === 0,
    issues,
    cleanedContent: cleaned !== content ? cleaned : null,
  };
}

export function validateAllPosts(posts: Record<string, string>): Record<string, ValidationResult> {
  const results: Record<string, ValidationResult> = {};
  for (const [key, content] of Object.entries(posts)) {
    results[key] = validatePost(content);
  }
  return results;
}

export function hasCriticalIssues(results: Record<string, ValidationResult>): boolean {
  for (const result of Object.values(results)) {
    for (const issue of result.issues) {
      if (issue.includes('Em dash')) return true;
    }
  }
  return false;
}
