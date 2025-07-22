import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const rapidApiKey = process.env.RAPID_API_KEY;

const rapidApiHost = 'seeking-alpha.p.rapidapi.com';

if (!rapidApiKey) {
  throw new Error('Missing RAPID_API_KEY in .env');
}

const headers = {
  'x-rapidapi-key': rapidApiKey,
  'x-rapidapi-host': rapidApiHost,
};

const options = {
  url: 'https://seeking-alpha.p.rapidapi.com/press-releases/v2/list',
  params: {
    id: 'aapl',
    size: '20',
    number: '1',
  },
  method: 'GET',
  headers,
};

export async function getSeekingAlphaData() {
    const symbol = 'medp'; // TODO will eventually take the symbol from user

    const stockId = await getSymbolId(symbol);

    makeCallToSeekingAlpha(options);
}

async function getSymbolId(symbol: string) {
  const getMetaDataUrl =
    'https://seeking-alpha.p.rapidapi.com/symbols/get-meta-data';

  const symbolIdOptions = {
    method: 'GET',
    url: getMetaDataUrl,
    params: { symbol },
    headers: {
      'x-rapidapi-key': 'cc1092c0f7msh3c32e5b541badf4p175daejsn4d01f33bd9ff',
      'x-rapidapi-host': 'seeking-alpha.p.rapidapi.com',
    },
  };

  const response = await makeCallToSeekingAlpha(symbolIdOptions);

  const id: string | undefined = response.data.id;

  if (!id) {
    throw new Error("Did not receive id from the Seeking Alpha API")
  }

  return id;
}

async function getEarnings(id: string) {
    /**
     * Data Fields Required
     * - Announcement date: 
     * - 
     */
}

async function makeCallToSeekingAlpha(options: any) {
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
}
