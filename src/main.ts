import { run } from './cli/index';

async function main() {
  run();
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
