import { EarningsData } from './earnings';

export interface GenerateGeminiPrompt {
  earningsData: EarningsData | null;
  callTranscript: string | null;
  pressRelease: string | null;
  symbol: string;
}
