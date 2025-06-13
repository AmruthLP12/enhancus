export function generateKey(
  length: number = 50,
  characterSet: string | string[] = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)",
  ensureDiversity: boolean = false
): string {
  const chars = Array.isArray(characterSet) ? characterSet.join("") : characterSet;
  let key = "";

  if (ensureDiversity && chars.includes("abcdefghijklmnopqrstuvwxyz") && chars.includes("0123456789") && chars.includes("!@#$%^&*(-_=+)")) {
    // Ensure at least one lowercase, one number, one special character
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*(-_=+)";
    
    key += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    key += numbers.charAt(Math.floor(Math.random() * numbers.length));
    key += special.charAt(Math.floor(Math.random() * special.length));
    
    // Fill the rest randomly
    for (let i = 3; i < length; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Shuffle the key to avoid predictable patterns
    key = key.split("").sort(() => Math.random() - 0.5).join("");
  } else {
    // Original random generation
    for (let i = 0; i < length; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  return key;
}

export function calculateStrength(
  key: string,
  checks: Record<string, (key: string) => boolean> = {
    length: (str) => str.length >= 50,
    lowercase: (str) => /[a-z]/.test(str),
    numbers: (str) => /[0-9]/.test(str),
    special: (str) => /[!@#$%^&*\-_=+]/.test(str), // Corrected regex: removed () from inside []
  }
): { score: number; checks: Record<string, boolean> } {
  let score = 0;
  const results: Record<string, boolean> = {};
  const checkCount = Object.keys(checks).length;

  for (const [checkName, checkFn] of Object.entries(checks)) {
    results[checkName] = checkFn(key);
    if (results[checkName]) score += 100 / checkCount;
  }

  return { score: Math.round(score), checks: results };
}


