import { makeSeekingAlphaCall } from './seekingAlphaClient';
import { htmlToText } from '../utils/htmlToText';

export async function getSymbolId(symbol: string) {
  const response = await makeSeekingAlphaCall({
    method: 'GET',
    url: 'https://seeking-alpha.p.rapidapi.com/symbols/get-meta-data',
    params: { symbol },
  });

  const id = response.data.id;
  if (!id) throw new Error(`No ID found for symbol: ${symbol}`);
  return id;
}

export async function getEarnings(companyId: string) {
  const response = await makeSeekingAlphaCall({
    method: 'GET',
    url: 'https://seeking-alpha.p.rapidapi.com/symbols/get-earnings',
    params: {
      ticker_ids: companyId,
      period_type: 'quarterly',
      relative_periods: '-1,0',
      estimates_data_items:
        'eps_gaap_actual,eps_normalized_actual,revenue_actual,revenue_consensus_mean',
      revisions_data_items:
        'eps_normalized_actual,eps_normalized_consensus_mean',
    },
  });

  const estimates = response?.estimates?.[companyId];
  if (!estimates) throw new Error('No earnings data found');

  const extractValue = (path: any) =>
    parseFloat(path?.['0']?.[0]?.dataitemvalue ?? 'NaN');

  return {
    announcementDate:
      estimates.eps_normalized_actual?.['0']?.[0]?.period?.advancedate ??
      'Unknown',
    epsNormalizedActual: extractValue(estimates.eps_normalized_actual),
    epsGAAPActual: extractValue(estimates.eps_gaap_actual),
    revenueActual: extractValue(estimates.revenue_actual),
    revenueSurprise:
      extractValue(estimates.revenue_actual) -
      extractValue(estimates.revenue_consensus_mean),
  };
}

export async function getCallTranscript(symbol: string) {
  const listResponse = await makeSeekingAlphaCall({
    method: 'GET',
    url: 'https://seeking-alpha.p.rapidapi.com/transcripts/v2/list',
    params: {
      id: symbol,
      size: '2',
      number: '1',
    },
  });

  const callTranscriptId = listResponse.data?.['0']?.id;
  if (!callTranscriptId) {
    throw new Error(
      'Could not get list of call transcripts from Seeking Alpha'
    );
  }

  const detailsResponse = await makeSeekingAlphaCall({
    method: 'GET',
    url: 'https://seeking-alpha.p.rapidapi.com/transcripts/v2/get-details',
    params: {
      id: callTranscriptId,
    },
  });

  const callTranscriptHTML = detailsResponse.data?.attributes?.content;
  if (!callTranscriptHTML) {
    throw new Error('Could not get call transcript from Seeking Alpha');
  }

  return htmlToText(callTranscriptHTML);
}

export async function getPressRelease(symbol: string) {
  const listResponse = await makeSeekingAlphaCall({
    method: 'GET',
    url: 'https://seeking-alpha.p.rapidapi.com/press-releases/v2/list',
    params: {
      id: symbol,
      size: '1',
      number: '1',
    },
  });

  const pressReleaseId = listResponse?.data?.[0]?.id;

  if (!pressReleaseId) {
    throw new Error('Could not get press release list from Seeking Alpha');
  }

  const detailsResponse = await makeSeekingAlphaCall({
    method: 'GET',
    url: 'https://seeking-alpha.p.rapidapi.com/press-releases/get-details',
    params: {
      id: pressReleaseId,
    },
  });

  const pressReleaseText = detailsResponse?.data?.attributes?.content;

  if (!pressReleaseText) {
    throw new Error('Could not get press release details from Seeking Alpha');
  }

  return htmlToText(pressReleaseText);
}
