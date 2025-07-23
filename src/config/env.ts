import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RAPID_API_KEY) {
  throw new Error('Missing RAPID_API_KEY');
}

export const SEEKING_ALPHA_HEADERS = {
  'x-rapidapi-key': process.env.RAPID_API_KEY,
  'x-rapidapi-host': 'seeking-alpha.p.rapidapi.com',
};
