import * as cheerio from "cheerio";

export function htmlToText(html: string): string {
  const $ = cheerio.load(html);
  return removeExcessWhiteSpace($.text().trim());
}

function removeExcessWhiteSpace(text: string) {
    const cleanedText = text
    .replace(/\s+/g, " ")   // Collapse all whitespace (tabs, newlines, multiple spaces) to a single space
    .replace(/ +/g, " ")    // Redundant but safe: reduce multiple spaces to one
    .trim();                // Remove leading/trailing whitespace

    return cleanedText;
}