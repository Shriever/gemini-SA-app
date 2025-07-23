import { expect } from 'chai';
import nock from 'nock';
import { makeSeekingAlphaCall } from '../src/api/seekingAlphaClient';
import { mockSymbolIdResponse } from './mocks/seekingAlphaMocks';

describe('makeSeekingAlphaCall()', () => {
  const baseUrl = 'https://seeking-alpha.p.rapidapi.com';

  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return data for a successful GET request', async () => {
    nock(baseUrl)
      .get('/symbols/get-meta-data')
      .query({ symbol: 'medp' })
      .reply(200, mockSymbolIdResponse);

    const result = await makeSeekingAlphaCall({
      url: `${baseUrl}/symbols/get-meta-data`,
      method: 'GET',
      params: { symbol: 'medp' },
    });

    expect(result).to.deep.equal(mockSymbolIdResponse);
  });

  it('should throw an error for a failed request', async () => {
    nock(baseUrl)
      .get('/symbols/get-meta-data')
      .query({ symbol: 'failme' })
      .reply(500);

    try {
      await makeSeekingAlphaCall({
        url: `${baseUrl}/symbols/get-meta-data`,
        method: 'GET',
        params: { symbol: 'failme' },
      });
      throw new Error('Expected error but none was thrown');
    } catch (err) {
      expect((err as Error).message).to.include('Seeking Alpha API error');
    }
  });
});
