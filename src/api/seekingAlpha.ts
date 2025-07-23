import axios from 'axios';
import dotenv from 'dotenv';
import { truncateLongText } from '../utils/truncateLongText';
import { htmlToText } from '../utils/htmlToText';

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
  const medpId = '568851';

  // const stockId = await getSymbolId(symbol);

  //   const earningsData = await getEarnings(medpId);

  await getPressRelease(symbol);
}

// @Params: symbol -> stock symbol is used to get the internal company id
// Returns: Internal stock id to use in other API calls
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
    throw new Error('Did not receive id from the Seeking Alpha API');
  }

  return id;
}

async function getCallTranscript(symbol: string) {

}

async function getPressRelease(symbol: string) {
  const pressReleaseListUrl =
    'https://seeking-alpha.p.rapidapi.com/press-releases/v2/list';

  const pressReleaseListOptions = {
    method: 'GET',
    url: pressReleaseListUrl,
    params: {
      id: symbol,
      size: '1',
      number: '1',
    },
    headers,
  };

  const listResponse = await makeCallToSeekingAlpha(pressReleaseListOptions);

  const pressReleaseId = listResponse?.data?.[0]?.id ?? undefined;

  if (!pressReleaseId) {
    throw new Error('Could not get press release list from Seeking Alpha');
  }

  const medpPressReleaseId = '20172455';
  const pressReleaseDetailsUrl =
    'https://seeking-alpha.p.rapidapi.com/press-releases/get-details';

  const pressReleaseDetailsOptions = {
    method: 'GET',
    url: pressReleaseDetailsUrl,
    params: {
      id: medpPressReleaseId,
    },
    headers,
  };

  const detailsResponse = await makeCallToSeekingAlpha(
    pressReleaseDetailsOptions
  ).catch(err => {
    throw new Error(err);
  });

  const pressReleaseText = detailsResponse?.data?.attributes?.content;

  const providerName =
    detailsResponse?.included?.['0']?.attributes?.providerName;

  /*
    console.log(`
    Provider Name: ${providerName}
    Press Release Text: ${htmlToText(pressReleaseText)}`);
  */
}

// @params: companyId -> Internal id used in place of stock symbol
// Returns: Object with 5 points of earnings data
async function getEarnings(companyId: string) {
  const earningsUrl =
    'https://seeking-alpha.p.rapidapi.com/symbols/get-earnings';
  const earningsOptions = {
    method: 'GET',
    url: earningsUrl,
    params: {
      ticker_ids: companyId,
      period_type: 'quarterly',
      relative_periods: '-1,0',
      estimates_data_items:
        'eps_gaap_actual,eps_normalized_actual,revenue_actual,revenue_consensus_mean',
      revisions_data_items:
        'eps_normalized_actual,eps_normalized_consensus_mean',
    },
    headers,
  };

  const response = await makeCallToSeekingAlpha(earningsOptions);

  if (!response) {
    throw new Error('Did not receive earnings data from the Seeking Alpha API');
  }

  try {
    const estimates = response.estimates[companyId];
    const actuals = {
      epsNormalized: parseFloat(
        estimates.eps_normalized_actual?.['0']?.[0]?.dataitemvalue ?? 'NaN'
      ),
      epsGAAP: parseFloat(
        estimates.eps_gaap_actual?.['0']?.[0]?.dataitemvalue ?? 'NaN'
      ),
      revenueActual: parseFloat(
        estimates.revenue_actual?.['0']?.[0]?.dataitemvalue ?? 'NaN'
      ),
      revenueEstimate: parseFloat(
        estimates.revenue_consensus_mean?.['0']?.[0]?.dataitemvalue ?? 'NaN'
      ),
      announcementDate:
        estimates.eps_normalized_actual?.['0']?.[0]?.advancedate ??
        estimates.eps_normalized_actual?.['0']?.[0]?.effectivedate ??
        'Unknown',
    };

    const revenueSurprise = actuals.revenueActual - actuals.revenueEstimate;
    /*
    console.log(`
        Announcement Date: ${actuals.announcementDate}
        EPS Normalized Actual: ${actuals.epsNormalized}
        EPS GAAP Actual: ${actuals.epsGAAP}
        Revenue Actual: ${actuals.revenueActual}
        Revenue Surprise: ${revenueSurprise}
        `);
*/
    return {
      announcementDate: actuals.announcementDate,
      epsNormalizedActual: actuals.epsNormalized,
      epsGAAPActual: actuals.epsGAAP,
      revenueActual: actuals.revenueActual,
      revenueSurprise: isNaN(revenueSurprise) ? 'NA' : revenueSurprise,
    };
  } catch (error) {
    throw new Error(error as string);
  }
}

async function makeCallToSeekingAlpha(options: any) {
  try {
    const response = await axios.request(options);
    // console.log(response);

    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
}
