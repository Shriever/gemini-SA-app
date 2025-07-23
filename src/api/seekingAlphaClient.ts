import axios from 'axios';
import { SEEKING_ALPHA_HEADERS } from '../config/env';

export async function makeSeekingAlphaCall(options: {
  url: string;
  method: 'GET' | 'POST';
  params?: Record<string, any>;
}) {
  try {
    const response = await axios.request({
      ...options,
      headers: SEEKING_ALPHA_HEADERS,
    });
    return response.data;
  } catch (err) {
    throw new Error(`Seeking Alpha API error: ${(err as Error).message}`);
  }
}
