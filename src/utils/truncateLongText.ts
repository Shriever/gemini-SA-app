export function truncateLongText(input: string, wordLimit: number = 200): string {
  const words = input.trim().split(/\s+/);
  const truncated = words.slice(0, wordLimit).join(" ");
  return truncated + "...";
}