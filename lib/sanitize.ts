
export function sanitizeText(input: string): string {
  const noTags = input.replace(/<[^>]*>/g, "");
  const norm = noTags.replace(/[ \t\x0B\f\r]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  return norm;
}
