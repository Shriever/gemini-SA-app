import * as service from './api/seekingAlphaService';
import { run } from './cli/index';

async function main() {
  // const symbol = 'medp';
  // const id = await service.getSymbolId(symbol);

  // const earnings = await service.getEarnings(id);
  // const press = await service.getPressRelease(symbol);
  // const call = await service.getCallTranscript(symbol);

  // console.log({ earnings, press, call });

  run();
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
