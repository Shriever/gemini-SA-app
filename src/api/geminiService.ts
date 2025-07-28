import { GoogleGenAI } from '@google/genai';
import { GenerateGeminiPrompt } from '../../types/prompts';

export function generateGeminiPrompt({
  earningsData,
  callTranscript,
  pressRelease,
  symbol,
}: GenerateGeminiPrompt): string {
  let earningsText: string | null = null;

  if (earningsData) {
    earningsText = `
      announcementDate: ${earningsData.announcementDate}
      epsNormalizedActual: $${earningsData.epsNormalizedActual}
      epsGAAPActual: $${earningsData.epsGAAPActual}
      revenueActual: $${earningsData.revenueActual}
      revenueSurprise: $${earningsData.revenueSurprise}
    `;
  }
  const prompt = `
🟦 EP‑PEADS UNIVERSAL EXECUTION PROMPT

If the press release and transcript are provided, use them  
as the primary source of truth for EPS, revenue, margins, and guidance.

If either is missing, search the web to fill in gaps:  
- Confirmed beat/miss data (EPS, sales)  
- Forward guidance (EPS and revenue)  
- Analyst reactions (PT changes, upgrades)  
- Macro or sector news influencing results

Use only official post‑earnings sources:  
- Press release: PR Newswire / IR site  
- Transcript: Motley Fool / Nasdaq  
- Analyst data: regional analysts, MarketBeat

✅ Prefer press release > third‑party summaries  
✅ Link all web‑sourced data directly  
✅ If a PDF is needed, alert PM  
✅ If no primary data, mark NA and proceed  
⛔ Ignore pre‑earnings content

✅ Ticker:  ${symbol.toUpperCase()}
✅ Earnings Date: ${earningsData?.announcementDate}

${earningsData ? `Earnings data: ${earningsText}` : ''}

${callTranscript ? `Call Transcript: ${callTranscript}` : ''}

${pressRelease ? `Press Release: ${pressRelease}` : ''}
`;

  return prompt;
}

export async function sendToGemini(geminiPrompt: string) {
  const ai = new GoogleGenAI({});

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: geminiPrompt,
  });

  return response.text?.replace(/\*/g, "");
}
