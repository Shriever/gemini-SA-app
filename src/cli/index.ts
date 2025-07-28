import readline from 'readline';
import * as service from '../api/seekingAlphaService';
import { generateGeminiPrompt, sendToGemini } from '../api/geminiService';

async function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve =>
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    })
  );
}

async function promptYesNo(question: string): Promise<boolean> {
  while (true) {
    const answer = (await promptUser(`${question} (y, N): `)).toLowerCase();
    if (answer === 'y') return true;
    if (answer === 'n' || answer === '') return false;
    console.log('Please enter y or N.');
  }
}

export async function run() {
  console.log('\tWelcome to the Seeking Alpha Gemini Assistant.');
  console.log(
    '--------------------------------------------------------------\n'
  );
  const mode = await promptUser(
    'Choose output mode (1 = Gemini Prompt only, 2 = Gemini Prompt + Gemini Output): '
  );

  console.log(
    `\n\tYou Selected: Gemini Prompt ${
      mode == '2' ? '+ Gemini Output' : 'only'
    }\n`
  );

  let symbol = await promptUser('Enter the stock symbol (e.g. AAPL): ');
  let symbolId: string | null = null;

  while (!symbolId) {
    try {
      symbolId = await service.getSymbolId(symbol);
    } catch {
      console.log('\t⚠️  Invalid symbol or ID not found. Please try again.\n');
      symbol = await promptUser('Enter a valid stock symbol: ');
    }
  }

  let earningsData = null;
  let callTranscript = null;
  let pressRelease = null;

  const missing: string[] = [];

  try {
    const symbolId = await service.getSymbolId(symbol);
    earningsData = await service.getEarnings(symbolId);
    console.log('\t✅ Earnings data retrieved.');
  } catch (e) {
    missing.push('earnings');
    console.log('\t⚠️  Failed to retrieve earnings data.\n');
  }

  try {
    callTranscript = await service.getCallTranscript(symbol);
    console.log('\t✅ Call transcript retrieved.');
  } catch (e) {
    missing.push('call transcript');
    console.log('\t⚠️  Failed to retrieve call transcript.\n');
  }

  try {
    pressRelease = await service.getPressRelease(symbol);
    console.log('\t✅ Press release retrieved.\n');
  } catch (e) {
    missing.push('press release');
    console.log('\t⚠️  Failed to retrieve press release.\n');
  }

  const geminiPrompt = generateGeminiPrompt({
    earningsData,
    callTranscript,
    pressRelease,
    symbol,
  });
  console.log('\n--- Gemini Prompt ---\n');
  console.log(geminiPrompt);

  if (mode === '2') {
    const confirmed = await promptYesNo('\nProceed with sending to Gemini?');
    if (confirmed) {
      const geminiResponse = await sendToGemini(geminiPrompt);
      console.log('\n--- Gemini Output ---\n');
      console.log(geminiResponse);
    } else {
      console.log('❌ Operation cancelled.');
    }
  } else {
    console.log('\nEND OF PROMPT.');
  }
}
