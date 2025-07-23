import {
  getSymbolId,
  getEarnings,
  getCallTranscript,
  getPressRelease,
} from './api/seekingAlphaService';
import { truncateLongText } from './utils/truncateLongText';

async function main() {
  const symbol = 'medp';
  const medpId = '568851'; // TODO for testing
  const id = await getSymbolId(symbol);

  const earnings = await getEarnings(id);
  const press = await getPressRelease(symbol);
  const call = await getCallTranscript(symbol);

  console.log({ earnings, press, call });

  console.log(`Call Transcript: ${truncateLongText(call)}
  
  Press Release: ${truncateLongText(press)}
  
  earnings: ${earnings}`)
}

main().catch(console.error);
