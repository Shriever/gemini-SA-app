import dotenv from 'dotenv';
import { getSeekingAlphaData } from "./api/seekingAlpha";


async function run() {
    // dotenv.config();

    await getSeekingAlphaData();
}

run();