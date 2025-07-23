import { getSeekingAlphaData } from "./api/seekingAlpha";

async function run() {
    await getSeekingAlphaData();
}

run();