import { expect } from 'chai';
import nock from 'nock';
import * as service from '../src/api/seekingAlphaService';
import * as mocks from './mocks/seekingAlphaMocks';
import { EarningsData } from '../types/earnings';

describe('SeekingAlpha Service Layer', () => {
    const symbol = 'medp';
  const baseUrl = 'https://seeking-alpha.p.rapidapi.com';

  beforeEach(() => {
    nock.cleanAll();
  });

  it('getSymbolId returns the internal ID', async () => {
    nock(baseUrl)
      .get('/symbols/get-meta-data')
      .query({ symbol })
      .reply(200, mocks.mockSymbolIdResponse);

    const result = await service.getSymbolId(symbol);
    expect(result).to.equal('568851');
  });

  it('getEarnings returns parsed earnings data', async () => {
    nock(baseUrl)
      .get('/symbols/get-earnings')
      .query(true)
      .reply(200, mocks.mockEarningsResponse);

    const result: EarningsData = await service.getEarnings('568851');
    expect(result).to.deep.equal({
      announcementDate: '2025-07-21T20:15:00.000-04:00',
      epsNormalizedActual: 3.10,
      epsGAAPActual: 3.10,
      revenueActual: 603310000.00,
      revenueSurprise: 64530000.00
    });
  });

  it("GetCallTranscript returns call transcript plaintext", async () => {
      nock(baseUrl)
      .get('/transcripts/v2/list')
      .query(true)
      .reply(200, mocks.mockTranscriptList);

      nock(baseUrl)
        .get('/transcripts/v2/get-details')
        .query(true)
        .reply(200, mocks.mockTranscriptDetails);

      const result = await service.getCallTranscript(symbol);
      expect(result).to.equal('Mocked transcript HTML');
      expect(result).to.not.include('<p>')
  })

  it('getPressRelease returns press release plaintext', async () => {
      nock(baseUrl)
      .get('/press-releases/v2/list')
      .query(true)
      .reply(200, mocks.mockPressReleaseList);

      nock(baseUrl)
        .get('/press-releases/get-details')
        .query(true)
        .reply(200, mocks.mockPressReleaseDetails);

        const result = await service.getPressRelease(symbol);
        expect(result).to.include('Test press release HTML')
        expect(result).to.not.include('</a>');
  })
});
